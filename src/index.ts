import main from './app/main.ts'

if ('serviceWorker' in navigator) {
  globalThis.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope)
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error)
      })
  })
}

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.ready.then((registration) => {
//     registration.unregister()
//   })
// }

main()
