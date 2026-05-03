// POST /attempt
//
// Records a user's answer and returns whether it was correct, the correct
// answer, the explanation, and the wiki — none of which the client had access
// to before. This is the only path through which the client learns the
// answer key.
//
// Body:
//   {
//     question_id:  uuid,
//     chosen:       number | boolean,
//     mode:         'blitz' | 'classic' | ... ,
//     session_id?:  uuid,
//     ms_to_answer?: number,
//     hints_used?:  number
//   }
//
// Behaviour for unauthenticated callers (guest mode): we still grade the
// answer and return the correct one, but we do NOT insert into attempts.
// That row will be replayed once the user signs in via the sync function.

// @ts-ignore — Deno std import.
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { corsPreflight, jsonResponse } from '../_shared/cors.ts';
import { getCallerUserId, serviceClient } from '../_shared/supabase.ts';

interface AttemptBody {
  question_id:   string;
  chosen:        number | boolean | null;
  mode?:         string;
  session_id?:   string;
  ms_to_answer?: number;
  hints_used?:   number;
}

serve(async (req: Request) => {
  const pre = corsPreflight(req);
  if (pre) return pre;

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, { status: 405 });
  }

  let body: AttemptBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, { status: 400 });
  }

  if (!body?.question_id) {
    return jsonResponse({ error: 'missing_question_id' }, { status: 400 });
  }

  // Service role: we need to read `correct` from the protected table.
  const svc = serviceClient();
  const { data: q, error: qErr } = await svc
    .from('questions')
    .select('id, type, correct, explanation, wiki, options, status')
    .eq('id', body.question_id)
    .single();

  if (qErr || !q) {
    return jsonResponse({ error: 'question_not_found' }, { status: 404 });
  }
  if (q.status !== 'published') {
    return jsonResponse({ error: 'question_not_published' }, { status: 403 });
  }

  // Grade.
  const correctAnswer = q.correct;
  const chosen        = body.chosen;
  const isCorrect     = gradeAnswer(q.type, correctAnswer, chosen);

  // Optional: record attempt for authenticated users.
  const userId = await getCallerUserId(req);
  if (userId) {
    const { error: insErr } = await svc.from('attempts').insert({
      user_id:      userId,
      question_id:  body.question_id,
      session_id:   body.session_id ?? null,
      mode:         (body.mode as any) ?? 'classic',
      chosen:       chosen as any,
      is_correct:   isCorrect,
      ms_to_answer: body.ms_to_answer ?? null,
      hints_used:   body.hints_used ?? 0,
    });
    if (insErr) {
      // Don't fail the response — caller still gets graded — but log.
      console.error('attempts insert failed', insErr);
    }
  }

  return jsonResponse({
    is_correct:  isCorrect,
    correct:     correctAnswer,
    explanation: q.explanation ?? '',
    wiki:        q.wiki ?? null,
    recorded:    !!userId,
  });
});

function gradeAnswer(type: string, correct: unknown, chosen: unknown): boolean {
  if (type === 'truefalse') {
    return Boolean(correct) === Boolean(chosen);
  }
  // diagnose / pharma / lab / diff / test / ecg / graph: index match.
  const a = Number(correct);
  const b = Number(chosen);
  return Number.isFinite(a) && Number.isFinite(b) && a === b;
}
