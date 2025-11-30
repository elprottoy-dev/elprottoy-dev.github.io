const CACHE_NAME = 'prottoy-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/projects.html',
  '/experience.html',
  '/contact.html',
  '/style.css',
  '/theme-vars.css',
  '/script.js',
  '/enhanced-ui.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request).catch(()=>caches.match('/'))));
});
