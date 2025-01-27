self.addEventListener('install', () => {
  console.log('install') // DEBUG
})

self.addEventListener('activate', () => {
  console.log('activate') // DEBUG
})

self.addEventListener('fetch', (event) => {
  console.log('fetch:', event.request.url) // DEBUG

  // function cacheResponse(cachedResponse) {
  //   const cacheName = 'v1'
  //   // If not in cache, fetch from network
  //   return fetch(event.request).then((response) => {
  //     // Optionally cache the new files for future use
  //     const responseClone = response.clone()
  //     caches.open(cacheName).then((cache) => {
  //       cache.put(event.request, responseClone) // Cache the new file
  //     })
  //     return response
  //   })
  // }

  // Try to fetch from the cache
  // const matchResponse = caches.match(event.request)

  // ?
  // const response = matchResponse.then(cacheResponse)

  // event.respondWith(response)
})
