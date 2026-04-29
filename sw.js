const CACHE_NAME = 'anshay-portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/style.min.css',
  '/assets/css/showcase.min.css',
  '/assets/css/features.min.css',
  '/assets/css/extras.min.css',
  '/assets/js/script.min.js',
  '/assets/js/showcase.min.js',
  '/assets/js/features.min.js',
  '/assets/js/extras.min.js',
  '/assets/js/mobile-perf.min.js',
  '/assets/images/anshay.webp',
  '/assets/images/N1.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found, else fetch from network
        return response || fetch(event.request);
      })
  );
});
