
const CACHE_NAME = 'planner30-cache-v2';
const ASSETS = [
  './planner_treino_pwa_upgraded.html',
  './manifest_planner.json',
  './exercises.json',
  './assets/placeholder.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request).then(networkResp => networkResp).catch(() => resp))
  );
});
