self.addEventListener('install', () => {
  console.log('install') // DEBUG
  // self.skipWaiting()
})

self.addEventListener('activate', () => {
  console.log('activate') // DEBUG
  // self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  async function updateCache() {
    const cache = await caches.open('v1')
    try {
      const networkResponse = await fetch(event.request)
      await cache.put(event.request, networkResponse.clone())
    } catch (error) {
      error
      // console.log(error) // DEBUG
    }
  }

  async function fetchCache() {
    // Fetch cache
    const cache = await caches.open('v1')
    const cachedResponse = await cache.match(event.request)

    if (cachedResponse) {
      return cachedResponse
    }
    return Response('Offline', { status: 503 })
  }

  async function f() {
    await updateCache()
    return await fetchCache()
  }

  const response = f()

  event.respondWith(response)
})
