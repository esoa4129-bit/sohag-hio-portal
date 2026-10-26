// Service Worker with Aggressive Cache-First Strategy for Zero Vercel Bandwidth
const CACHE_NAME = "hio-booking-v7";
const PRECACHE_ASSETS = [
  "/",
  "/team",
  "/manifest.json",
  "/manifest-booking.json",
  "/favicon.ico",
  "/logo.png?v=3",
  "/icon-192.png?v=3",
  "/icon-512.png?v=3",
  "/apple-touch-icon.png?v=3",
  "/schedules/10th-ramadan-morning.jpg",
  "/schedules/10th-ramadan-evening.jpg",
  "/schedules/wafa-clinic.jpg",
  "/schedules/tahta-clinic.jpg",
  "/schedules/specialized-clinics-committees.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn("Pre-cache non-fatal warning:", err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Cache-First with Network Fallback (Ensures 0 Bandwidth on repeated visits)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // CRITICAL: Never intercept cross-origin requests (external IPs, external portals, APIs)
  if (url.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => cached || caches.match("/"));
        })
    );
    return;
  }

  // Static Assets, Images, Next Chunks: Cache-First
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // 0 Bandwidth consumed!
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (url.pathname.startsWith("/_next/") ||
              url.pathname.startsWith("/schedules/") ||
              url.pathname.match(/\.(png|jpg|jpeg|svg|webp|woff2|css|js|ico|json)$/))
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return new Response(null, { status: 404, statusText: "Offline Asset Not Found" });
        });
    })
  );
});
