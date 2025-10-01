self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("checks-app").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/app.js",
        "/manifest.json",
        "/icons/icon-192-solid.png",
        "/icons/icon-512-solid.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});