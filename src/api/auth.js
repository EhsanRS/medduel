// MedDuel — auth wrapper around Supabase Auth.
//
// Loads @supabase/supabase-js dynamically the first time it's needed so
// the SDK doesn't get downloaded for guest-only sessions. Exposes a
// minimal façade:
//
//   await MDAuth.init()                        — restores session from cache
//   await MDAuth.getUser()                     — current user or null
//   await MDAuth.signInMagicLink(email)        — sends an email magic link
//   await MDAuth.signInWithApple()             — native sheet on Capacitor;
//                                                 OAuth redirect on web
//   await MDAuth.signInWithGoogle()            — same
//   await MDAuth.signOut()
//   MDAuth.onChange(cb)                        — subscribe to user changes
//   MDAuth.client()                            — raw Supabase client (lazy)
//
// On native (Capacitor) Apple/Google use the native sheet via the
// platform plugins. On web they use Supabase's standard OAuth redirect.

(function () {
  'use strict';

  const ENV = window.MD_ENV || {};
  const URL_OK = !!(ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY);

  let _client = null;
  let _ready  = null;
  let _listeners = new Set();
  let _currentUser = null;

  async function getClient() {
    if (!URL_OK) throw new Error('supabase_not_configured');
    if (_client) return _client;
    if (!_ready) {
      _ready = (async () => {
        // ESM URL import — works in modern browsers + Capacitor WebView.
        // Once the build is fully Vite-driven, swap for a static import.
        const mod = await import('https://esm.sh/@supabase/supabase-js@2.45.0?bundle');
        _client = mod.createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
          auth: {
            persistSession:        true,
            autoRefreshToken:      true,
            detectSessionInUrl:    true,
            storageKey:            'md_supabase_auth',
          },
        });
        // Bridge auth state into MDState + listeners.
        _client.auth.onAuthStateChange(async (_evt, session) => {
          const user = (session && session.user) || null;
          _currentUser = user;
          await window.MDState.setCachedAuthUser(user
            ? {
                id:    user.id,
                email: user.email,
                access_token:  session.access_token,
                refresh_token: session.refresh_token,
              }
            : null);
          for (const fn of _listeners) {
            try { fn(user); } catch {}
          }
        });
        return _client;
      })();
    }
    return _ready;
  }

  async function init() {
    if (!URL_OK) return null;
    try {
      const sb = await getClient();
      const { data } = await sb.auth.getUser();
      _currentUser = data && data.user ? data.user : null;
      return _currentUser;
    } catch {
      return null;
    }
  }

  async function getUser() {
    if (_currentUser) return _currentUser;
    return init();
  }

  async function signInMagicLink(email) {
    const sb = await getClient();
    const redirectTo = window.location.origin + window.location.pathname;
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) throw error;
    return { ok: true, message: 'Check your email for a sign-in link.' };
  }

  async function oauth(provider) {
    const sb = await getClient();
    const onNative = !!(window.MDNative && window.MDNative.isNative);

    // Native path (Capacitor): the host app should open the OS-native
    // sheet via @capacitor-community/apple-sign-in or
    // @codetrix-studio/capacitor-google-auth, then call
    // MDAuth.exchangeNativeIdToken({ provider, idToken, nonce }) below.
    // For web, fall through to the standard redirect flow.
    if (onNative) {
      throw new Error('native_oauth_not_wired_yet');
    }

    const redirectTo = window.location.origin + window.location.pathname;
    const { error } = await sb.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    if (error) throw error;
    return { ok: true };
  }

  async function signInWithApple()  { return oauth('apple');  }
  async function signInWithGoogle() { return oauth('google'); }

  // Used by the native bridge after the platform sheet returns an
  // identity token (Apple) or ID token (Google).
  async function exchangeNativeIdToken({ provider, idToken, nonce }) {
    const sb = await getClient();
    const { error, data } = await sb.auth.signInWithIdToken({
      provider, token: idToken, nonce,
    });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    if (!URL_OK) return;
    try {
      const sb = await getClient();
      await sb.auth.signOut();
    } catch {}
    _currentUser = null;
    await window.MDState.setCachedAuthUser(null);
    for (const fn of _listeners) {
      try { fn(null); } catch {}
    }
  }

  function onChange(cb) {
    _listeners.add(cb);
    return () => _listeners.delete(cb);
  }

  function isConfigured() { return URL_OK; }

  window.MDAuth = {
    init, getUser,
    signInMagicLink, signInWithApple, signInWithGoogle,
    exchangeNativeIdToken, signOut,
    onChange, isConfigured,
    client: getClient,
  };
})();
