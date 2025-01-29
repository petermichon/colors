import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/Addons.js'

export default function main() {
  const width = globalThis.innerWidth
  const height = globalThis.innerHeight

  // Camera
  const camera = new THREE.PerspectiveCamera(75, width / height)
  camera.position.set(8, 4, 8)

  // Scene
  const scene = new THREE.Scene()

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setAnimationLoop(animate)
  document.body.appendChild(renderer.domElement)

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)

  // Boxes
  const geometry = new THREE.BoxGeometry(0.1, 1, 1)
  const material = new THREE.MeshStandardMaterial()

  {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(-1.5, 0.5, -1.5)
    scene.add(mesh)
  }
  {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(1.5, 0.5, 1.5)
    scene.add(mesh)
  }

  // Lights
  const light = new THREE.PointLight(0xffffff, 1)
  light.position.set(0, 2, 0)
  scene.add(light)

  // Helpers
  const gridSize = 50
  const gridHelper = new THREE.GridHelper(gridSize, gridSize)
  scene.add(gridHelper)

  const lightHelper = new THREE.PointLightHelper(light)
  scene.add(lightHelper)

  controls.update()

  function animate(time: number) {
    {
      // Auto resize canvas
      // const width = window.innerWidth;
      // const height = window.innerHeight;
      // renderer.setSize(width, height);
    }

    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;
    // light.position.x += Math.cos(time / 1000) * 0.1;
    light.position.z += Math.sin(time / 1000) * 0.05

    renderer.render(scene, camera)
  }

  globalThis.addEventListener('resize', onWindowResize, false)

  function onWindowResize() {
    camera.aspect = globalThis.innerWidth / globalThis.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(globalThis.innerWidth, globalThis.innerHeight)
  }
}

// ---

export function requestFullscreen() {
  document.documentElement.requestFullscreen({ navigationUI: 'hide' })
}

// ---

// deno-lint-ignore no-explicit-any
let installPrompt: any

globalThis.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt')
  // e.preventDefault();
  installPrompt = e
})

export function prompt() {
  installPrompt.prompt()
}

// document.addEventListener('click', prompt, { once: true })

// ---
