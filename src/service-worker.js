self.addEventListener('install', () => {
  console.log('install') // DEBUG
})

self.addEventListener('activate', () => {
  console.log('activate') // DEBUG
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If a cached response is found, return it
      const cacheResponseFound = cachedResponse !== undefined
      if (cacheResponseFound) {
        return cachedResponse
      }

      // If no cached response
      // Fetch the request from the network
      return fetch(event.request).then((networkResponse) => {
        // Cache the network response for future use
        return caches.open('v1').then((cache) => {
          cache.put(event.request, networkResponse.clone())
          return networkResponse
        })
      })
    })
  )
})
