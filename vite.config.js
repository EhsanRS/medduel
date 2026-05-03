// Vite config — minimal, no JS rewrite required.
//
// Why Vite at all? Two reasons:
//   1. We need a build step that produces a clean `dist/` folder so
//      Capacitor can wrap it for iOS/Android.
//   2. We need build-time replacement of MD_ENV so the SPA can be
//      configured per-environment (dev / staging / prod) without
//      hand-editing index.html.
//
// We intentionally do NOT switch the existing JS modules to ES imports
// in this batch. The current `<script>` global pattern keeps working
// because Vite serves index.html and inlined <script src="..."> tags
// the same way a static server does. The only build-time magic is the
// `define` block below, which substitutes the MD_ENV placeholders.

import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: '.',
    publicDir: 'public',
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      // No JS code-splitting yet — the existing scripts depend on
      // load order via <script> tags. Just copy them as-is via
      // Vite's static asset handling.
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
      },
      target: 'es2019',
      sourcemap: true,
    },
    server: {
      port: 5173,
      strictPort: false,
      open: false,
    },
    preview: {
      port: 4173,
    },
    // Build-time replacements — used in index.html's <script>
    // window.MD_ENV = { ... } block.
    define: {
      __MD_SUPABASE_URL__:
        JSON.stringify(env.VITE_SUPABASE_URL || ''),
      __MD_SUPABASE_ANON_KEY__:
        JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''),
      __MD_BUILD_TIME__:
        JSON.stringify(new Date().toISOString()),
    },
  };
});
