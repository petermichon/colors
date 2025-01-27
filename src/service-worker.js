const CACHE_NAME = 'v1'
const urlsToCache = [
  // '/', // The root page
  // '/index.html',
  // '/index.css', // styles.css
  // '/app/main.ts',
  // '/icon.svg',
  // '/icon-192x192.png',
  // '/icon-512x512.png',
  // '/manifest.webmanifest',
  // '/@vite/client', // ?
]

self.addEventListener('install', (event) => {
  // Pre-cache files during the install phase
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app files')
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('activate', (event) => {
  event
  console.log('Service Worker activated')
})

self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for: ', event.request.url)

  event.respondWith(
    caches
      .match(event.request) // Try to fetch from the cache
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse // Return cached file if available
        }

        // If not in cache, fetch from network
        return fetch(event.request).then((response) => {
          // Optionally cache the new files for future use
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone) // Cache the new file
          })
          return response
        })
      })
  )
})
