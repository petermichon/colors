self.addEventListener('install', () => {
  console.log('install') // DEBUG
})

self.addEventListener('activate', () => {
  console.log('activate') // DEBUG
})

// client -> worker
self.addEventListener('fetch', (event) => {
  const response = caches.match(event.request).then((cachedResponse) => {
    // If a cached response is found, return it
    const cachedResponseFound = cachedResponse !== undefined
    if (cachedResponseFound) {
      return cachedResponse
    }

    // If no cached response

    // worker -> host
    const networkResponse = fetch(event.request).then(
      async (networkResponse) => {
        // worker <- host
        const cache = await caches.open('v1')
        cache.put(event.request, networkResponse.clone())
        return networkResponse
      }
    )
    return networkResponse
  })

  // client <- worker
  event.respondWith(response)
})
