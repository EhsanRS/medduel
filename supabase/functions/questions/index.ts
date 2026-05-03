// GET /questions
//
// Returns the published question bank without the answer key.
// The frontend caches the response in IndexedDB; bust the cache when
// `version` changes.
//
// Query params:
//   ?domain=cardio          filter by domain
//   ?type=diagnose          filter by question type
//   ?since=2026-01-01T00Z   only rows updated after this timestamp
//   ?legacy=1               include legacy_idx (default: included)
//   ?limit=500              cap the result (default 2000, max 5000)
//
// Anonymous callers are allowed — content is public-readable. Auth is
// optional and only used to upgrade rate limits in a future iteration.

// @ts-ignore — Deno std lib URL import.
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { corsPreflight, jsonResponse } from '../_shared/cors.ts';
import { userClient } from '../_shared/supabase.ts';

const MAX_LIMIT     = 5000;
const DEFAULT_LIMIT = 2000;

serve(async (req: Request) => {
  const pre = corsPreflight(req);
  if (pre) return pre;

  if (req.method !== 'GET') {
    return jsonResponse({ error: 'method_not_allowed' }, { status: 405 });
  }

  const url    = new URL(req.url);
  const domain = url.searchParams.get('domain');
  const type   = url.searchParams.get('type');
  const since  = url.searchParams.get('since');
  const limit  = Math.min(
    parseInt(url.searchParams.get('limit') ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT,
    MAX_LIMIT,
  );

  const sb = userClient(req);
  // Reads from the answer-key-free public view.
  let q = sb
    .from('questions_public')
    .select(
      'id, legacy_idx, type, domain, display_label, question_text, ' +
      'options, explanation, wiki, fig, difficulty, subtype, tags, ' +
      'source_locale, version, updated_at',
    )
    .order('legacy_idx', { ascending: true })
    .limit(limit);

  if (domain) q = q.eq('domain', domain);
  if (type)   q = q.eq('type',   type);
  if (since)  q = q.gt('updated_at', since);

  const { data, error } = await q;
  if (error) {
    return jsonResponse({ error: 'query_failed', detail: error.message }, { status: 500 });
  }

  // Compute a cheap content version: max(updated_at) + count.
  const newest = data?.reduce(
    (acc, row: any) => (row.updated_at > acc ? row.updated_at : acc),
    '1970-01-01T00:00:00Z',
  );

  return jsonResponse(
    { count: data?.length ?? 0, newest, items: data ?? [] },
    {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=300',
        'X-MedDuel-Newest': newest ?? '',
      },
    },
  );
});
