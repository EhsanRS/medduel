// MedDuel — runtime native (Capacitor) detection + adapter wiring.
//
// When the app boots inside a Capacitor wrapper (iOS / Android), this
// module:
//   1. Detects native via window.Capacitor.
//   2. Swaps MDStorage's adapter from LocalStorageAdapter to a thin
//      PreferencesAdapter that proxies to @capacitor/preferences.
//   3. Exposes window.MDNative.{isNative, platform} so other modules can
//      branch on the runtime (e.g. native auth sheets vs. magic-link).
//
// Loaded as a plain <script> AFTER storage.js. Preferences is loaded
// dynamically from a CDN ESM URL so this file works without a bundler;
// once the project moves to ES modules + Vite this becomes a normal
// import. If the dynamic import fails (rare), we fall back to
// LocalStorageAdapter so the app still boots.

(function () {
  'use strict';

  const isNative = !!(window.Capacitor && window.Capacitor.isNativePlatform &&
                      window.Capacitor.isNativePlatform());
  const platform = (window.Capacitor && window.Capacitor.getPlatform &&
                    window.Capacitor.getPlatform()) || 'web';

  function PreferencesAdapter(Preferences) {
    this.name = 'capacitor-preferences';
    this._P   = Preferences;
  }
  PreferencesAdapter.prototype.get = async function (key) {
    const { value } = await this._P.get({ key });
    if (value === null || value === undefined) return null;
    try { return JSON.parse(value); } catch { return value; }
  };
  PreferencesAdapter.prototype.set = async function (key, value) {
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    await this._P.set({ key, value: v });
    return true;
  };
  PreferencesAdapter.prototype.remove = async function (key) {
    await this._P.remove({ key });
    return true;
  };
  PreferencesAdapter.prototype.keys = async function () {
    const { keys } = await this._P.keys();
    return keys || [];
  };

  async function tryWireNativeAdapter() {
    if (!isNative) return false;
    try {
      // ESM URL import works in modern WKWebView / Android WebView.
      // When we ship via Capacitor + Vite, this is replaced by a real
      // bundled import.
      const mod = await import('https://esm.sh/@capacitor/preferences@6.0.0');
      const Preferences = mod && mod.Preferences;
      if (!Preferences) throw new Error('preferences_export_missing');
      window.MDStorage.setAdapter(new PreferencesAdapter(Preferences));
      console.info('[MedDuel] native storage adapter installed:', platform);
      return true;
    } catch (err) {
      console.warn('[MedDuel] native adapter failed, using localStorage:', err.message || err);
      return false;
    }
  }

  window.MDNative = {
    isNative,
    platform,
    tryWireNativeAdapter,
  };

  // Best-effort install on script load. Other modules using MDStorage
  // before this resolves are safe — they'll get the localStorage adapter
  // (which is also valid on native, just slower for large blobs).
  if (isNative) {
    tryWireNativeAdapter();
  }
})();
