// Helpers for constructing Supabase clients inside Edge Functions.
//
// - userClient(req): a per-request client with the caller's JWT.
//   Use for any read/write that should respect the caller's RLS.
// - serviceClient(): a service-role client. Use ONLY for operations that
//   genuinely require bypassing RLS (e.g. reading the secret answer key
//   for a question that the user has just submitted an answer for).

// @ts-ignore — Deno-only ESM URL import in Supabase Edge runtime.
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SUPABASE_URL              = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_ANON_KEY         = Deno.env.get('SUPABASE_ANON_KEY')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

export function userClient(req: Request): SupabaseClient {
  const auth = req.headers.get('Authorization') ?? '';
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false },
  });
}

export function serviceClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

export async function getCallerUserId(req: Request): Promise<string | null> {
  const sb = userClient(req);
  const { data, error } = await sb.auth.getUser();
  if (error || !data?.user) return null;
  return data.user.id;
}
