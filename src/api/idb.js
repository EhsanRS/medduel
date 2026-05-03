// MedDuel — minimal IndexedDB wrapper.
//
// Used for caching the question bank locally so the SPA / Capacitor app
// boots fully offline. Falls back to MDStorage when IndexedDB is missing.
//
// Single object store `kv` with string keys → arbitrary JSON-serialisable
// values. Stored values include a tiny `_v` stamp so we can invalidate.

(function () {
  'use strict';

  const DB_NAME = 'medduel';
  const STORE   = 'kv';
  const VERSION = 1;

  let _db = null;
  function open() {
    if (_db) return Promise.resolve(_db);
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') return reject(new Error('no_idb'));
      const req = indexedDB.open(DB_NAME, VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = () => { _db = req.result; resolve(_db); };
      req.onerror   = () => reject(req.error);
    });
  }

  function tx(mode) {
    return open().then(db => db.transaction(STORE, mode).objectStore(STORE));
  }

  async function get(key) {
    try {
      const store = await tx('readonly');
      return await new Promise((resolve, reject) => {
        const r = store.get(key);
        r.onsuccess = () => resolve(r.result ?? null);
        r.onerror   = () => reject(r.error);
      });
    } catch {
      // Fallback: MDStorage (localStorage) for browsers without IDB.
      return window.MDStorage.get('idb_' + key);
    }
  }

  async function set(key, value) {
    try {
      const store = await tx('readwrite');
      return await new Promise((resolve, reject) => {
        const r = store.put(value, key);
        r.onsuccess = () => resolve(true);
        r.onerror   = () => reject(r.error);
      });
    } catch {
      return window.MDStorage.set('idb_' + key, value);
    }
  }

  async function remove(key) {
    try {
      const store = await tx('readwrite');
      return await new Promise((resolve, reject) => {
        const r = store.delete(key);
        r.onsuccess = () => resolve(true);
        r.onerror   = () => reject(r.error);
      });
    } catch {
      return window.MDStorage.remove('idb_' + key);
    }
  }

  window.MDIdb = { get, set, remove };
})();
