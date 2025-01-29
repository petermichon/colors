self.addEventListener('install', () => {
  console.log('install') // DEBUG
  // self.skipWaiting()
})

self.addEventListener('activate', () => {
  console.log('activate') // DEBUG
  // self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const response = (async () => {
    try {
      // Fetch from network
      const networkResponse = await fetch(event.request)

      // If successful, cache the network response
      const cache = await caches.open('v1')
      cache.put(event.request, networkResponse.clone())

      return networkResponse
    } catch (error) {
      // If network fails, check the cache
      const cache = await caches.open('v1')
      const cachedResponse = await cache.match(event.request)

      //If successful, return cached response
      if (cachedResponse !== undefined) {
        return cachedResponse
      }

      // If no cache available, return offline response
      return new Response('Offline', { status: 503 })
    }
  })()

  event.respondWith(response)
})
