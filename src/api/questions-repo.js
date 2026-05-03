// MedDuel — question-bank repository.
//
// Strategy:
//   1. On startup, try to fetch the question bank from the Edge Function.
//   2. Cache the result in IndexedDB under key `questions:v1`.
//   3. If the network is unavailable, fall back to the IDB cache.
//   4. If neither works (first run, offline, no env), fall back to the
//      legacy in-memory window.QUESTIONS array bundled in the SPA.
//
// The legacy fallback is critical during the migration: the existing
// game.js/dossier.js/etc. all read from window.QUESTIONS today. As long
// as that array exists the game keeps working even if the backend is
// unreachable. Future PRs can phase out the bundled data file once the
// API is fully wired in.
//
// Public surface:
//   await MDQuestions.load()          → ensures bank is in memory
//   MDQuestions.all()                  → array (sync after load)
//   MDQuestions.byLegacyIdx(idx)       → single question
//   MDQuestions.byId(uuid)             → single question
//   MDQuestions.byDomain(domain)       → filtered array
//   await MDQuestions.refresh({force}) → re-fetch from server

(function () {
  'use strict';

  const CACHE_KEY = 'questions:v1';
  // Stale after 24h; we still serve stale during fetch and revalidate.
  const STALE_MS  = 24 * 60 * 60 * 1000;

  let _items   = null;     // in-memory copy
  let _loaded  = false;
  let _loadingPromise = null;

  // Map a server row to the shape the existing UI expects from QUESTIONS.
  // Existing code reads: q.type, q.domain, q.dl, q.q, q.a, q.c, q.ex,
  // q.wiki, q.fig, q.d, q.subtype.
  // The server omits `c` (correct). UI must call MDApi('attempt') instead.
  function adaptServerRow(row) {
    return {
      id:      row.id,
      type:    row.type,
      domain:  row.domain,
      dl:      row.display_label,
      q:       row.question_text,
      a:       row.options,
      ex:      row.explanation,
      wiki:    row.wiki,
      fig:     row.fig,
      d:       row.difficulty,
      subtype: row.subtype,
      // No `c` field on purpose — the UI must POST /attempt to grade.
      _legacy_idx: row.legacy_idx,
      _version:    row.version,
      _updated_at: row.updated_at,
    };
  }

  async function fetchFromServer() {
    if (!window.MDApi || !window.MDApi.isConfigured()) {
      throw new Error('not_configured');
    }
    const resp = await window.MDApi.call('questions');
    if (!resp || !Array.isArray(resp.items)) throw new Error('bad_response');
    return resp.items.map(adaptServerRow);
  }

  async function loadFromCache() {
    const cached = await window.MDIdb.get(CACHE_KEY);
    if (!cached || !Array.isArray(cached.items)) return null;
    return cached;
  }

  async function saveToCache(items) {
    await window.MDIdb.set(CACHE_KEY, {
      ts:    Date.now(),
      items,
    });
  }

  function loadFromBundled() {
    // Legacy fallback: window.QUESTIONS is populated by src/data/questions.js.
    if (!Array.isArray(window.QUESTIONS)) return [];
    // The bundled rows still have `c` — that's fine for offline-only,
    // un-authenticated play. The cloud-grading path is opt-in.
    return window.QUESTIONS.map((q, i) => ({
      ...q,
      _legacy_idx: i,
      _version:    0,
      _bundled:    true,
    }));
  }

  async function load() {
    if (_loaded) return _items;
    if (_loadingPromise) return _loadingPromise;

    _loadingPromise = (async () => {
      // 1. Try cache first for instant boot.
      const cached = await loadFromCache().catch(() => null);
      if (cached) {
        _items  = cached.items;
        _loaded = true;
        // Stale-while-revalidate: kick off a refresh in the background.
        if (Date.now() - cached.ts > STALE_MS) {
          refresh({ force: false }).catch(() => {});
        }
        return _items;
      }

      // 2. Try server.
      try {
        const items = await fetchFromServer();
        await saveToCache(items);
        _items  = items;
        _loaded = true;
        return _items;
      } catch (err) {
        console.info('[MedDuel] question fetch failed, falling back to bundled:', err.message || err);
      }

      // 3. Fall back to bundled data.
      _items  = loadFromBundled();
      _loaded = true;
      return _items;
    })();

    try {
      return await _loadingPromise;
    } finally {
      _loadingPromise = null;
    }
  }

  async function refresh({ force = false } = {}) {
    if (!window.MDApi || !window.MDApi.isConfigured()) return _items;
    try {
      const items = await fetchFromServer();
      await saveToCache(items);
      _items  = items;
      _loaded = true;
      // Mirror to window.QUESTIONS so legacy callers see fresh data.
      // Note: legacy code uses `c` which is absent from server rows; it's
      // only used in offline guest mode, which keeps the bundled copy.
      return _items;
    } catch (err) {
      if (force) throw err;
      return _items;
    }
  }

  function all()                      { return _items || []; }
  function byLegacyIdx(idx)           { return all().find(q => q._legacy_idx === idx) || null; }
  function byId(id)                   { return all().find(q => q.id === id) || null; }
  function byDomain(domain)           { return all().filter(q => q.domain === domain); }

  // Grade a single answer through the Edge Function. Falls back to local
  // grading when offline / unconfigured (using the bundled `c` field).
  async function gradeAttempt({ question, chosen, mode, sessionId, msToAnswer, hintsUsed }) {
    // Online path:
    if (window.MDApi && window.MDApi.isConfigured() && question.id) {
      try {
        return await window.MDApi.call('attempt', {
          method: 'POST',
          body: {
            question_id:  question.id,
            chosen,
            mode,
            session_id:   sessionId || null,
            ms_to_answer: msToAnswer || null,
            hints_used:   hintsUsed  || 0,
          },
        });
      } catch (err) {
        // Fall through to local grading + queue for replay.
        console.info('[MedDuel] /attempt failed, grading locally:', err.message || err);
      }
    }
    // Offline path:
    const correct = question.c;
    const isCorrect = question.type === 'truefalse'
      ? Boolean(correct) === Boolean(chosen)
      : Number(correct) === Number(chosen);
    // Queue for later replay if the user is signed in eventually.
    await window.MDState.pushPendingOp({
      type: 'attempt',
      payload: {
        question_id: question.id || null,
        legacy_idx:  question._legacy_idx ?? null,
        chosen, mode, sessionId, msToAnswer, hintsUsed,
        is_correct: isCorrect,
      },
    });
    return {
      is_correct:  isCorrect,
      correct,
      explanation: question.ex || '',
      wiki:        question.wiki || null,
      recorded:    false,
      offline:     true,
    };
  }

  window.MDQuestions = {
    load, refresh, all, byLegacyIdx, byId, byDomain, gradeAttempt,
  };
})();
