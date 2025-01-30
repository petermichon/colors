import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/Addons.js'

export default function main() {
  // ---

  const keys: Record<string, boolean> = {}

  // Listen for keydown and keyup events
  globalThis.addEventListener('keydown', (event) => {
    keys[event.code] = true
  })

  globalThis.addEventListener('keyup', (event) => {
    keys[event.code] = false
  })

  // ---

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
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial()

  // function setblock(x: number, y: number, z: number) {
  //   x += 0.5
  //   y += 0.5
  //   z += 0.5
  //   const mesh = new THREE.Mesh(geometry, material)
  //   mesh.position.set(x, y, z)
  //   scene.add(mesh)
  // }

  // setblock(1, 0, 0)
  // setblock(2, 0, 0)
  // setblock(3, 0, 0)
  // setblock(4, 0, 0)
  // setblock(5, 0, 0)
  // setblock(6, 0, 0)
  // setblock(7, 0, 0)
  // setblock(8, 0, 0)
  // setblock(9, 0, 0)

  // Lights
  const light = new THREE.PointLight(0xffffff, 1)
  light.position.set(4.5, 3.5, 1.5)
  scene.add(light)

  const player = new THREE.Mesh(geometry, material)
  player.position.set(5.5, 0.5, 0.5)
  scene.add(player)

  // Helpers
  const gridSize = 50
  const gridHelper = new THREE.GridHelper(gridSize, gridSize)
  scene.add(gridHelper)

  const lightHelper = new THREE.PointLightHelper(light)
  scene.add(lightHelper)

  controls.update()

  function animate() {
    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;
    // light.position.x += Math.cos(time / 1000) * 0.1;
    // light.position.z += Math.sin(time / 1000) * 0.05

    // Move the cube based on keyboard input
    if (keys['KeyA']) player.position.x -= 0.1
    if (keys['KeyD']) player.position.x += 0.1

    if (keys['KeyW']) player.position.z -= 0.1
    if (keys['KeyS']) player.position.z += 0.1

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
