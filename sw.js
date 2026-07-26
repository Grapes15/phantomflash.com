/* Phantom Flash PWA service worker — v1 (2026-07-25)
   Strategy: network-first for everything, cache fallback for offline.
   Never caches cross-origin (blockchain APIs, GA, Stripe) — those pass through untouched. */
var CACHE = 'pflash-v1';
var SHELL = [
  '/', '/index.html', '/scan.html', '/checkout.html', '/thanks.html',
  '/assets/style.css', '/assets/scan.js?v=20260725a', '/assets/i18n.js?v=20260722a',
  '/assets/icon-192.png', '/assets/icon-512.png', '/assets/favicon.svg'
];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL).catch(function(){}); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;              // never touch cross-origin
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(resp){
      if (resp && resp.ok) {
        var copy = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      }
      return resp;
    }).catch(function(){
      return caches.match(e.request).then(function(hit){ return hit || caches.match('/index.html'); });
    })
  );
});
