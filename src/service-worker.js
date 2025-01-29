self.addEventListener('install', () => {
  console.log('install') // DEBUG
  // self.skipWaiting()
})

self.addEventListener('activate', () => {
  console.log('activate') // DEBUG
  // self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  async function f() {
    try {
      const networkResponse = await fetch(event.request)

      const cache = await caches.open('v1')
      cache.put(event.request, networkResponse.clone())

      return networkResponse
    } catch {
      const cache = await caches.open('v1')
      const cachedResponse = await cache.match(event.request)

      if (cachedResponse !== undefined) {
        return cachedResponse
      } else {
        return new Response('Offline', { status: 503 })
      }
    }
  }

  const response = f()

  event.respondWith(response)
})
