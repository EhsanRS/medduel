// MedDuel — grading + attempt recording.
//
// Two layers:
//
//  - mdGrade(q, chosen)
//      Async. Call when we want server-authoritative grading. Returns
//      { ok, correctValue, correctLabel, explanation, wiki, offline }.
//      Internally calls MDQuestions.gradeAttempt(); falls back to local
//      grading using q.c when offline / unconfigured / unauthenticated.
//
//  - mdRecordAttempt(q, chosen, isCorrect, ctx)
//      Fire-and-forget. Posts to /attempt without blocking the UI.
//      Used by the existing gameplay code which still grades locally
//      via `idx === q.c`. Once we move to ES modules + a full refactor
//      this can be retired in favour of mdGrade everywhere.
//
// Both helpers no-op safely when Supabase isn't configured, so the
// existing offline flow is undisturbed.

(function () {
  'use strict';

  function correctLabelFor(q, correctValue) {
    if (!q) return '—';
    if (q.type === 'truefalse') return correctValue ? 'True' : 'False';
    if (Array.isArray(q.a)) {
      const idx = Number(correctValue);
      return Number.isFinite(idx) ? q.a[idx] : '—';
    }
    return '—';
  }

  async function mdGrade(q, chosen, ctx = {}) {
    if (!q) {
      return { ok: false, correctValue: null, correctLabel: '—', explanation: '', wiki: null, offline: true };
    }
    let result;
    try {
      result = await window.MDQuestions.gradeAttempt({
        question:    q,
        chosen,
        mode:        ctx.mode,
        sessionId:   ctx.sessionId,
        msToAnswer:  ctx.msToAnswer,
        hintsUsed:   ctx.hintsUsed,
      });
    } catch {
      // Local fallback — use bundled q.c if present.
      const ok = q.type === 'truefalse'
        ? Boolean(q.c) === Boolean(chosen)
        : Number(q.c) === Number(chosen);
      result = {
        is_correct:  ok,
        correct:     q.c,
        explanation: q.ex || '',
        wiki:        q.wiki || null,
        offline:     true,
      };
    }
    return {
      ok:           !!result.is_correct,
      correctValue: result.correct,
      correctLabel: correctLabelFor(q, result.correct),
      explanation:  result.explanation || (q.ex || ''),
      wiki:         result.wiki || (q.wiki || null),
      offline:      !!result.offline,
    };
  }

  // Fire-and-forget recorder. Returns a promise but callers don't need
  // to await. Errors are swallowed (network, auth, etc.).
  function mdRecordAttempt(q, chosen, isCorrect, ctx = {}) {
    if (!q) return Promise.resolve();
    const api = window.MDApi;
    if (!api || !api.isConfigured() || !q.id) return Promise.resolve();
    const promise = api.call('attempt', {
      method: 'POST',
      body: {
        question_id:  q.id,
        chosen,
        mode:         ctx.mode || 'classic',
        session_id:   ctx.sessionId || null,
        ms_to_answer: ctx.msToAnswer || null,
        hints_used:   ctx.hintsUsed  || 0,
      },
    }).catch((err) => {
      // Queue offline replay when we couldn't reach the function.
      window.MDState.pushPendingOp({
        type: 'attempt',
        payload: {
          question_id: q.id,
          chosen, isCorrect,
          mode: ctx.mode || 'classic',
          ms_to_answer: ctx.msToAnswer || null,
          hints_used:   ctx.hintsUsed  || 0,
        },
      }).catch(() => {});
      // Don't rethrow — fire-and-forget.
      return null;
    });
    return promise;
  }

  window.MDGrading = { mdGrade, mdRecordAttempt };
  window.mdGrade         = mdGrade;
  window.mdRecordAttempt = mdRecordAttempt;
})();
