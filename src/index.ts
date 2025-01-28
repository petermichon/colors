import main from './app/main.ts'

document.documentElement.requestFullscreen({ navigationUI: 'hide' })

if ('serviceWorker' in navigator) {
  globalThis.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('scope:', registration.scope) // DEBUG
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error) // DEBUG
      })
  })
}

main()
