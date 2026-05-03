// MedDuel — Capacitor configuration.
//
// Wraps the SPA built into dist/ for iOS and Android. Generate the native
// projects locally with:
//
//     npm install
//     npm run build
//     npx cap add ios
//     npx cap add android
//     npx cap sync
//
// The native projects (ios/, android/) are generated artefacts and
// committed to the repo so CI can build them, but their build outputs
// are gitignored (see .gitignore).

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId:   process.env.CAPACITOR_APP_ID   || 'com.medduel.app',
  appName: process.env.CAPACITOR_APP_NAME || 'MedDuel',
  webDir:  'dist',
  bundledWebRuntime: false,
  loggingBehavior: 'production',

  // Universal-link / app-link host. Used so challenge URLs and magic-link
  // auth callbacks open the native app instead of Safari/Chrome.
  server: {
    androidScheme: 'https',
    // Allow the in-app browser used by Supabase Auth magic links to
    // navigate back into the app on the configured host.
    allowNavigation: [
      'medduel.app',
      '*.supabase.co',
      'appleid.apple.com',
      'accounts.google.com',
    ],
  },

  ios: {
    // Allows iOS to load mixed http/https content during local dev only.
    // Production builds use https everywhere.
    contentInset: 'automatic',
    scheme: 'MedDuel',
    backgroundColor: '#F5F0E8',
  },

  android: {
    backgroundColor: '#F5F0E8',
    // Required for Android 13+ notification permission flow.
    allowMixedContent: false,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration:        2000,
      launchAutoHide:            true,
      backgroundColor:           '#F5F0E8',
      androidSplashResourceName: 'splash',
      androidScaleType:          'CENTER_CROP',
      showSpinner:               false,
      splashImmersive:           true,
      splashFullScreen:          true,
    },

    PushNotifications: {
      // Channel/category metadata configured natively in iOS/Android
      // projects after `cap add`. This is just the JS-side opt-in stub.
      presentationOptions: ['badge', 'sound', 'alert'],
    },

    Preferences: {
      // Group key — keeps native preferences scoped to the app.
      group: 'NativeStorage',
    },

    StatusBar: {
      style:               'LIGHT',
      backgroundColor:     '#F5F0E8',
      overlaysWebView:     false,
    },
  },
};

export default config;
