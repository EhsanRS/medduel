// MedDuel — typed state helpers built on MDStorage.
//
// This is the layer the rest of the app should call. The existing
// loadStats / saveStats / loadXP / etc. in src/ui.js stay for now (they read
// localStorage directly); these helpers mirror them but route through
// MDStorage so they keep working once we swap to the SupabaseAdapter.
//
// Naming convention: `getX()` returns a Promise<T>, `setX(v)` returns
// Promise<boolean>. Synchronous helpers in ui.js are renamed to `loadX`.
//
// Loaded as a plain <script>; depends on src/api/storage.js loading first.

(function () {
  'use strict';
  const K = window.MDStorage.KEYS;
  const S = window.MDStorage;

  // ── Profile ───────────────────────────────────────────────────────────
  async function getName()             { return (await S.get(K.NAME)) || ''; }
  async function setName(name)         { return S.set(K.NAME, String(name).trim()); }
  async function getLocale()           { return (await S.get(K.LANG)) || 'en'; }
  async function setLocale(code)       { return S.set(K.LANG, code); }
  async function getSoundEnabled()     {
    const v = await S.get(K.SOUND);
    return v !== 'off';
  }
  async function setSoundEnabled(on)   { return S.set(K.SOUND, on ? 'on' : 'off'); }

  // ── Stats / XP ────────────────────────────────────────────────────────
  async function getStats()            { return (await S.get(K.STATS)) || {}; }
  async function patchStats(patch) {
    const cur = await getStats();
    const next = Object.assign({}, cur, patch);
    await S.set(K.STATS, next);
    return next;
  }
  async function getXP()               {
    const v = await S.get(K.XP);
    if (v == null) return 0;
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : 0;
  }
  async function setXP(n)              { return S.set(K.XP, String(n | 0)); }
  async function addXP(delta) {
    const next = (await getXP()) + (delta | 0);
    await setXP(next);
    return next;
  }

  // ── Domain stats ──────────────────────────────────────────────────────
  async function getDomainStats()      { return (await S.get(K.DOMAIN_STATS)) || {}; }
  async function mergeDomainStats(patch) {
    const cur = await getDomainStats();
    for (const [domain, { c, t }] of Object.entries(patch || {})) {
      if (!cur[domain]) cur[domain] = { c: 0, t: 0 };
      cur[domain].c += c | 0;
      cur[domain].t += t | 0;
    }
    await S.set(K.DOMAIN_STATS, cur);
    return cur;
  }

  // ── Favourites ────────────────────────────────────────────────────────
  async function getFavourites()       { return (await S.get(K.FAV)) || []; }
  async function setFavourites(list)   { return S.set(K.FAV, list || []); }

  // ── Weakness map ──────────────────────────────────────────────────────
  async function getWeak()             { return (await S.get(K.WEAK)) || {}; }
  async function setWeak(map)          { return S.set(K.WEAK, map || {}); }

  // ── Spaced repetition ─────────────────────────────────────────────────
  async function getSR()               { return (await S.get(K.SR)) || {}; }
  async function setSR(map)            { return S.set(K.SR, map || {}); }

  // ── Achievements ──────────────────────────────────────────────────────
  async function getAchievements()     { return (await S.get(K.ACH)) || []; }
  async function setAchievements(list) { return S.set(K.ACH, list || []); }

  // ── Session history ───────────────────────────────────────────────────
  async function getSessionHistory()   { return (await S.get(K.SESSION_HIST)) || []; }
  async function appendSession(entry) {
    const hist = await getSessionHistory();
    hist.push(entry);
    if (hist.length > 30) hist.splice(0, hist.length - 30);
    await S.set(K.SESSION_HIST, hist);
    return hist;
  }

  // ── Daily challenge ───────────────────────────────────────────────────
  async function getDailyRecord()      { return await S.get(K.DAILY); }
  async function setDailyRecord(rec)   { return S.set(K.DAILY, rec); }
  async function getDailyStreak()      {
    return (await S.get(K.DAILY_STREAK)) || { n: 0, last: '' };
  }
  async function setDailyStreak(s)     { return S.set(K.DAILY_STREAK, s); }

  // ── Open patient ──────────────────────────────────────────────────────
  async function getOpenPatient()      { return await S.get(K.OPEN_PATIENT); }
  async function setOpenPatient(p)     { return S.set(K.OPEN_PATIENT, p); }
  async function clearOpenPatient()    { return S.remove(K.OPEN_PATIENT); }

  // ── Auth (local cache of the session — not authoritative) ─────────────
  async function getCachedAuthUser()   { return await S.get(K.AUTH_USER); }
  async function setCachedAuthUser(u)  {
    if (!u) return S.remove(K.AUTH_USER);
    return S.set(K.AUTH_USER, u);
  }
  async function getLastSync()         { return await S.get(K.LAST_SYNC); }
  async function setLastSync(ts)       { return S.set(K.LAST_SYNC, ts); }

  // ── Pending offline mutations ────────────────────────────────────────
  // When a user is offline (or signed out) we queue writes here and replay
  // them after sign-in / reconnect. Each entry: { id, type, payload, ts }.
  async function getPendingOps()       { return (await S.get(K.PENDING_OPS)) || []; }
  async function pushPendingOp(op) {
    const ops = await getPendingOps();
    ops.push(Object.assign({ id: cryptoRandomId(), ts: Date.now() }, op));
    await S.set(K.PENDING_OPS, ops);
    return ops;
  }
  async function clearPendingOps()     { return S.set(K.PENDING_OPS, []); }
  function cryptoRandomId() {
    try {
      const a = new Uint8Array(8);
      crypto.getRandomValues(a);
      return Array.from(a, b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      return Math.random().toString(36).slice(2, 18);
    }
  }

  // Expose globally.
  window.MDState = {
    getName, setName,
    getLocale, setLocale,
    getSoundEnabled, setSoundEnabled,
    getStats, patchStats,
    getXP, setXP, addXP,
    getDomainStats, mergeDomainStats,
    getFavourites, setFavourites,
    getWeak, setWeak,
    getSR, setSR,
    getAchievements, setAchievements,
    getSessionHistory, appendSession,
    getDailyRecord, setDailyRecord,
    getDailyStreak, setDailyStreak,
    getOpenPatient, setOpenPatient, clearOpenPatient,
    getCachedAuthUser, setCachedAuthUser,
    getLastSync, setLastSync,
    getPendingOps, pushPendingOp, clearPendingOps,
  };
})();
