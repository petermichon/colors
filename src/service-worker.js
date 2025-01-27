const CACHE_NAME = 'v1'

self.addEventListener('install', () => {
  console.log('Service Worker installed')
})

self.addEventListener('activate', () => {
  console.log('Service Worker activated')
})

self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for: ', event.request.url)

  const response = caches
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

  event.respondWith(response)
})
