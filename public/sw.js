// Service Worker for nirjar.me - Offline Reading & Performance
const CACHE_NAME = "nirjar-portfolio-v1"

const PRECACHE_ASSETS = [
  "/",
  "/works",
  "/services",
  "/articles",
  "/sitemap",
  "/legal",
  "/works/trace",
  "/works/bastion",
  "/works/kost",
  "/works/hookdrop",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icon.svg",
  "/resume.pdf",
]

self.addEventListener("install", (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {
        // Tolerant to individual route failure during pre-caching
      })
    }),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
    ]),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event

  if (request.method !== "GET") return

  const url = new URL(request.url)

  // Skip external analytics, APIs, and non-same-origin calls
  if (url.origin !== self.location.origin) return

  // Cache-First for static hashed assets, fonts, and images
  if (
    url.pathname.startsWith("/_assets/") ||
    url.pathname.startsWith("/fonts/") ||
    url.pathname.startsWith("/assets/")
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return networkResponse
        })
      }),
    )
    return
  }

  // HTML navigation & articles: Stale-While-Revalidate with offline fallback
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return networkResponse
        })
        .catch(() => {
          return caches.match(request).then((cached) => cached || caches.match("/"))
        }),
    )
    return
  }

  // Generic assets: Network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return networkResponse
      })
      .catch(() => caches.match(request)),
  )
})
