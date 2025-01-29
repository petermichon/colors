self.addEventListener('install', () => {
  console.log('install') // DEBUG
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  console.log('activate') // DEBUG
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      try {
        // Try fetching from the network
        const networkResponse = await fetch(event.request)

        // Cache the network response if successful
        const cache = await caches.open('dynamic-cache')
        cache.put(event.request, networkResponse.clone())

        return networkResponse
      } catch (error) {
        // If network fails, check the cache
        const cache = await caches.open('dynamic-cache')
        const cachedResponse = await cache.match(event.request)

        // Return cached response or fallback to a default (offline page, etc.)
        if (cachedResponse) {
          return cachedResponse
        }

        // If no cache available, return a default offline response (optional)
        return new Response('Offline', { status: 503 })
      }
    })()
  )
})
