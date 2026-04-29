const CACHE = 'medduel-v60';
const ASSETS = [
  '/',
  '/index.html',
  '/src/styles.css',
  '/src/ui.js',
  '/src/game.js',
  '/src/dossier.js',
  '/src/daily.js',
  '/src/favourites.js',
  '/src/learn.js',
  '/src/weak.js',
  '/src/onboarding.js',
  '/src/theory.js',
  '/src/detective.js',
  '/src/admin.js',
  '/src/router.js',
  '/src/data/questions.js',
  '/src/data/cases.js',
  '/src/data/detective_cases.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
