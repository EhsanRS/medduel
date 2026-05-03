// MedDuel — storage adapter abstraction
//
// Goal: every persistent piece of state goes through `MDStorage` instead of
// touching `localStorage` directly. This lets us swap implementations:
//   - LocalStorageAdapter  → guest mode / web fallback
//   - PreferencesAdapter   → Capacitor native (iOS/Android) — wired in later
//   - SupabaseAdapter      → cloud sync once the user has an account
//
// All methods are async so the same call site works for every backend.
// Existing synchronous loadX/saveX helpers in src/ui.js continue to work
// during the migration; new code should use MDStorage instead.
//
// This file is loaded as a plain <script> for now (no ES module imports)
// to match the existing project layout in index.html. When we move to Vite
// in a later batch this will become an ES module without behaviour changes.

(function () {
  'use strict';

  // ── Single source of truth for storage keys ──────────────────────────
  const KEYS = Object.freeze({
    NAME:           'md_name',
    LANG:           'md_lang',
    SOUND:          'md_sound',
    STATS:          'md_stats',
    XP:             'md_xp',
    FAV:            'md_fav',
    WEAK:           'md_weak',
    SR:             'md_sr',
    ACH:            'md_ach',
    DOMAIN_STATS:   'md_domain_stats',
    OPEN_PATIENT:   'md_open_patient',
    SESSION_HIST:   'md_session_hist',
    DAILY:          'md_daily',
    DAILY_STREAK:   'md_dstreak',
    // Cloud sync metadata
    AUTH_USER:      'md_auth_user',
    LAST_SYNC:      'md_last_sync',
    PENDING_OPS:    'md_pending_ops',
    QUESTIONS_VER:  'md_q_ver',
    QUESTIONS_DATA: 'md_q_data',
  });

  // ── LocalStorageAdapter ──────────────────────────────────────────────
  function LocalStorageAdapter() {
    this.name = 'localStorage';
  }
  LocalStorageAdapter.prototype.get = async function (key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      try { return JSON.parse(raw); } catch { return raw; }
    } catch { return null; }
  };
  LocalStorageAdapter.prototype.set = async function (key, value) {
    try {
      const v = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, v);
      return true;
    } catch { return false; }
  };
  LocalStorageAdapter.prototype.remove = async function (key) {
    try { localStorage.removeItem(key); return true; } catch { return false; }
  };
  LocalStorageAdapter.prototype.keys = async function () {
    try { return Object.keys(localStorage); } catch { return []; }
  };

  // ── MemoryAdapter (for tests / SSR / private mode fallback) ──────────
  function MemoryAdapter() {
    this.name = 'memory';
    this._m = new Map();
  }
  MemoryAdapter.prototype.get    = async function (k) { return this._m.has(k) ? this._m.get(k) : null; };
  MemoryAdapter.prototype.set    = async function (k, v) { this._m.set(k, v); return true; };
  MemoryAdapter.prototype.remove = async function (k) { this._m.delete(k); return true; };
  MemoryAdapter.prototype.keys   = async function () { return [...this._m.keys()]; };

  // ── Pick a backend ────────────────────────────────────────────────────
  function pickAdapter() {
    try {
      const probe = '__md_probe__';
      localStorage.setItem(probe, '1');
      localStorage.removeItem(probe);
      return new LocalStorageAdapter();
    } catch {
      return new MemoryAdapter();
    }
  }

  // ── Public façade ─────────────────────────────────────────────────────
  // Methods are intentionally narrow — the rest of the app reads/writes
  // typed values through helpers in src/api/state.js (added in the next batch).
  const MDStorage = {
    KEYS,
    _adapter: pickAdapter(),

    /** Replace the active backend (e.g. with PreferencesAdapter on native). */
    setAdapter(adapter) {
      if (!adapter || typeof adapter.get !== 'function') {
        throw new Error('MDStorage.setAdapter: invalid adapter');
      }
      this._adapter = adapter;
    },

    get(key)         { return this._adapter.get(key); },
    set(key, value)  { return this._adapter.set(key, value); },
    remove(key)      { return this._adapter.remove(key); },
    keys()           { return this._adapter.keys(); },

    /** Read every md_* key into a plain object. Used by the cloud-sync
        importer to migrate guest progress on first sign-in. */
    async snapshot() {
      const all = await this.keys();
      const out = {};
      for (const k of all) {
        if (!k.startsWith('md_')) continue;
        out[k] = await this.get(k);
      }
      return out;
    },
  };

  // Expose globally for the existing <script> based modules.
  window.MDStorage              = MDStorage;
  window.LocalStorageAdapter    = LocalStorageAdapter;
  window.MemoryAdapter          = MemoryAdapter;
})();
