// MedDuel — Supabase client bootstrap.
//
// We intentionally don't import @supabase/supabase-js here yet because the
// project is still in pre-Vite mode (plain <script> tags, no bundler).
// Instead we expose a tiny façade that:
//
//   - Reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from window.MD_ENV
//     (populated by Vite at build time, or by a small inline <script> in
//     index.html during local dev).
//   - Provides `MDApi.fetch(path, options)` — a thin wrapper around fetch
//     that prepends the Edge Functions base URL and adds the
//     Authorization header when a session is present.
//
// Once the Vite migration lands, this file becomes the place that creates
// the real `@supabase/supabase-js` client. Until then we use raw fetch
// against /functions/v1/* and PostgREST.
//
// Loaded as a plain <script>; depends on storage.js + state.js.

(function () {
  'use strict';

  const ENV = (window.MD_ENV || {});
  const SUPABASE_URL  = ENV.SUPABASE_URL  || '';
  const ANON_KEY      = ENV.SUPABASE_ANON_KEY || '';

  // Helpful warning for devs running without env config.
  if (!SUPABASE_URL || !ANON_KEY) {
    console.info(
      '[MedDuel] No Supabase env detected. Running in offline-only mode. ' +
      'Set window.MD_ENV.{SUPABASE_URL, SUPABASE_ANON_KEY} or use Vite envs.'
    );
  }

  function fnUrl(path) {
    if (!SUPABASE_URL) return null;
    const base = SUPABASE_URL.replace(/\/+$/, '');
    return `${base}/functions/v1/${path.replace(/^\/+/, '')}`;
  }

  async function authHeader() {
    const cached = await window.MDState.getCachedAuthUser();
    const token  = cached && cached.access_token;
    if (token) return { Authorization: `Bearer ${token}` };
    if (ANON_KEY) return { Authorization: `Bearer ${ANON_KEY}` };
    return {};
  }

  async function call(path, { method = 'GET', body, headers, query } = {}) {
    const url = fnUrl(path);
    if (!url) throw new Error('supabase_not_configured');

    const finalHeaders = {
      'Accept': 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(ANON_KEY ? { apikey: ANON_KEY } : {}),
      ...(await authHeader()),
      ...(headers || {}),
    };

    const u = new URL(url);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null) u.searchParams.set(k, String(v));
      }
    }

    const res = await fetch(u.toString(), {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    if (!res.ok) {
      const err = new Error(`http_${res.status}`);
      err.status = res.status;
      err.body   = data;
      throw err;
    }
    return data;
  }

  function isConfigured() { return !!(SUPABASE_URL && ANON_KEY); }

  window.MDApi = { call, fnUrl, isConfigured };
})();
