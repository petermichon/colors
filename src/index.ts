import main from './app/main.ts'

if ('serviceWorker' in navigator) {
  globalThis.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('scope:', registration.scope) // DEBUG
      })
      .catch((error) => {
        console.log('register:', error) // DEBUG
      })
  })
}

main()

// deno-lint-ignore no-explicit-any
let installPrompt: any

globalThis.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt')
  // e.preventDefault();
  installPrompt = e
})

document.addEventListener('click', prompt, { once: true })

function prompt() {
  installPrompt.prompt()
}
