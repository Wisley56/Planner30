const CACHE = 'planner30-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js','./js/theme.js','./js/router.js','./js/timers.js','./js/planner.js','./js/library.js','./js/storage.js',
  './data/plan.json','./data/exercises.json',
  './assets/placeholder.png',
  './assets/icons/icon-192.png','./assets/icons/icon-512.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
});

self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE?caches.delete(k):null))));
});

self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(resp=> resp || fetch(e.request).then(net=>net).catch(()=>resp)));
});