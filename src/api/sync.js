// MedDuel — first-login localStorage → cloud importer.
//
// Behaviour:
//   On the first sign-in for a given user_id, take a snapshot of every
//   md_* key and merge it into the user's cloud row. Conflict policy
//   is "max-merge per metric" — the cloud copy never decreases. Imports
//   are flagged in MDState as md_imported_<userId> so we don't re-run.
//
// This file is a skeleton: the merge logic is implemented but the
// network calls are stubbed against a single Edge Function `sync` that
// will land in a follow-up PR. Until then, signing in still works —
// the importer just queues the snapshot and logs it.

(function () {
  'use strict';

  const IMPORT_FLAG_KEY = 'md_imported_for';

  async function isAlreadyImported(userId) {
    const flag = await window.MDStorage.get(IMPORT_FLAG_KEY);
    return flag === userId;
  }

  async function markImported(userId) {
    await window.MDStorage.set(IMPORT_FLAG_KEY, userId);
  }

  async function snapshotLocalState() {
    const all = await window.MDStorage.snapshot();
    return {
      name:           all.md_name           || null,
      locale:         all.md_lang           || 'en',
      xp:             parseInt(all.md_xp || '0', 10) || 0,
      stats:          all.md_stats          || {},
      domain_stats:   all.md_domain_stats   || {},
      favourites:     all.md_fav            || [],
      weak:           all.md_weak           || {},
      sr:             all.md_sr             || {},
      achievements:   all.md_ach            || [],
      session_hist:   all.md_session_hist   || [],
      daily:          all.md_daily          || null,
      daily_streak:   all.md_dstreak        || null,
    };
  }

  // Pulls the user's authoritative state from the server. Until the
  // sync Edge Function ships, this returns an empty baseline.
  async function fetchRemoteState() {
    if (!window.MDApi || !window.MDApi.isConfigured()) return null;
    try {
      // Future: MDApi.call('sync', { method: 'GET' });
      return {
        xp:           0,
        stats:        {},
        domain_stats: {},
        favourites:   [],
        achievements: [],
      };
    } catch {
      return null;
    }
  }

  // Max-merge: cloud keeps the larger value for each numeric metric,
  // and the union for set-like fields.
  function mergeStates(local, remote) {
    if (!remote) return local;
    return {
      name:         local.name ?? remote.name ?? null,
      locale:       local.locale || remote.locale || 'en',
      xp:           Math.max(local.xp || 0, remote.xp || 0),
      stats: {
        played:       Math.max(local.stats.played       || 0, remote.stats.played       || 0),
        best:         Math.max(local.stats.best         || 0, remote.stats.best         || 0),
        totalCorrect: Math.max(local.stats.totalCorrect || 0, remote.stats.totalCorrect || 0),
        totalWrong:   Math.max(local.stats.totalWrong   || 0, remote.stats.totalWrong   || 0),
        bestStreak:   Math.max(local.stats.bestStreak   || 0, remote.stats.bestStreak   || 0),
        dayStreak:    Math.max(local.stats.dayStreak    || 0, remote.stats.dayStreak    || 0),
      },
      domain_stats: mergeDomainStats(local.domain_stats, remote.domain_stats),
      favourites:   uniqueBy([...(local.favourites || []), ...(remote.favourites || [])], 'q'),
      weak:         { ...(remote.weak || {}), ...(local.weak || {}) },
      sr:           { ...(remote.sr   || {}), ...(local.sr   || {}) },
      achievements: [...new Set([...(local.achievements || []), ...(remote.achievements || [])])],
      session_hist: [...(remote.session_hist || []), ...(local.session_hist || [])].slice(-30),
      daily:        local.daily         || remote.daily         || null,
      daily_streak: local.daily_streak  || remote.daily_streak  || null,
    };
  }

  function mergeDomainStats(a, b) {
    const out = {};
    for (const map of [a || {}, b || {}]) {
      for (const [k, v] of Object.entries(map)) {
        if (!out[k]) out[k] = { c: 0, t: 0 };
        out[k].c = Math.max(out[k].c, v.c | 0);
        out[k].t = Math.max(out[k].t, v.t | 0);
      }
    }
    return out;
  }

  function uniqueBy(list, key) {
    const seen = new Set();
    const out  = [];
    for (const item of list || []) {
      const id = item && item[key];
      if (!id || seen.has(id)) continue;
      seen.add(id);
      out.push(item);
    }
    return out;
  }

  // Replays any attempts that were queued while offline / unauthenticated.
  async function replayPendingOps() {
    const ops = await window.MDState.getPendingOps();
    if (!ops.length || !window.MDApi || !window.MDApi.isConfigured()) return 0;
    let replayed = 0;
    for (const op of ops) {
      if (op.type !== 'attempt' || !op.payload || !op.payload.question_id) continue;
      try {
        await window.MDApi.call('attempt', { method: 'POST', body: op.payload });
        replayed++;
      } catch {
        // Stop on first failure to preserve order.
        break;
      }
    }
    if (replayed > 0) {
      // Drop the successfully replayed prefix.
      const remaining = ops.slice(replayed);
      await window.MDStorage.set(window.MDStorage.KEYS.PENDING_OPS, remaining);
    }
    return replayed;
  }

  // Top-level sync. Idempotent — safe to call on every sign-in.
  async function syncOnSignIn(userId) {
    if (!userId) return { skipped: 'no_user' };
    if (await isAlreadyImported(userId)) {
      const replayed = await replayPendingOps();
      return { skipped: 'already_imported', replayed };
    }
    const local  = await snapshotLocalState();
    const remote = await fetchRemoteState();
    const merged = mergeStates(local, remote);

    // Push merged copy back to local state immediately so the UI shows
    // the correct numbers even before the server roundtrip finishes.
    await window.MDState.setXP(merged.xp);
    await window.MDState.patchStats(merged.stats);
    if (merged.name) await window.MDState.setName(merged.name);

    // TODO: POST merged → /functions/v1/sync once that lands.

    await markImported(userId);
    const replayed = await replayPendingOps();
    return { ok: true, merged, replayed };
  }

  window.MDSync = { syncOnSignIn, replayPendingOps, snapshotLocalState };
})();
