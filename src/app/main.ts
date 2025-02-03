import * as THREE from 'three'

// import { OrbitControls } from 'three/examples/jsm/Addons.js'
import nipplejs from 'nipplejs'

export default function main() {
  // ---

  // Disable default right click menu
  document.addEventListener('contextmenu', function (event) {
    event.preventDefault()
  })

  // ---

  // 'pointerdown'
  // globalThis.addEventListener('click', () => {
  //   requestFullscreen()
  // })

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

  // Set up virtual joystick using nipplejs
  const manager = nipplejs.create({
    zone: document.body,
    mode: 'dynamic', // can be 'static' or 'dynamic'
    position: { left: '15%', top: '80%' },
  })

  // Variables to track joystick input
  let moveX = 0
  let moveY = 0

  manager.on('move', function (evt, data) {
    moveX = data.vector.x
    moveY = data.vector.y
    evt
  })

  manager.on('end', function () {
    moveX = 0
    moveY = 0
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

  // Boxes
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial()

  function setblock(x: number, y: number, z: number) {
    x += 0.5
    y += 0.5
    z += 0.5
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    scene.add(mesh)
  }

  setblock(-2, 0, 0)
  setblock(-1, 0, 0)
  setblock(1, 0, 0)
  setblock(2, 0, 0)
  setblock(3, 0, 0)
  setblock(4, 0, 0)
  setblock(5, 0, 0)
  setblock(6, 0, 0)
  setblock(7, 0, 0)
  setblock(8, 0, 0)
  setblock(9, 0, 0)
  setblock(9, 1, 0)

  // Lights
  const light = new THREE.PointLight(0xffffff, 5)
  light.position.set(0, 10, 0)
  scene.add(light)

  const player = new THREE.Mesh(geometry, material)
  player.position.set(0.5, 0.5, 0.5)
  scene.add(player)

  // ---

  // Set up raycaster and mouse vector for detecting clicks
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const blueMat = new THREE.MeshBasicMaterial({ color: 0x007bff }) // Blue color
  const button = new THREE.Mesh(geometry, blueMat)
  button.position.set(0.5, 0.5, -5.5) // Position the button in front of the camera
  scene.add(button)

  function onMouseClick(event: MouseEvent) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / globalThis.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / globalThis.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    // Check for intersections between the ray and the button
    const intersects = raycaster.intersectObject(button)
    if (intersects.length > 0) {
      requestFullscreen()
    }
  }

  document.addEventListener('click', onMouseClick, false)

  // ---

  // Helpers
  const gridSize = 50
  const gridHelper = new THREE.GridHelper(gridSize, gridSize)
  scene.add(gridHelper)

  const lightHelper = new THREE.PointLightHelper(light)
  scene.add(lightHelper)

  // ---

  const whiteMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    depthTest: false, // Disable depth test
  })

  // Circle flat to the ground
  const circleGeom = new THREE.CircleGeometry(0.25, 32)

  const dot = new THREE.Mesh(circleGeom, whiteMat)
  dot.position.set(5.5, 0, 3.5)
  dot.rotateX(-Math.PI / 2)
  scene.add(dot)

  // ---

  // Set to false (default is undefined)
  keys['KeyW'] = false
  keys['KeyA'] = false
  keys['KeyS'] = false
  keys['KeyD'] = false

  function animate() {
    // Move player
    // if (keys['KeyW']) player.position.z -= 1 * 0.125 // Z
    // if (keys['KeyA']) player.position.x -= 1 * 0.125 // Q
    // if (keys['KeyS']) player.position.z += 1 * 0.125 // S
    // if (keys['KeyD']) player.position.x += 1 * 0.125 // D

    // dot.position.x += moveX * 0.5
    // dot.position.z -= moveY * 0.5

    // ---

    let delta = 1.5

    const isDiagonal =
      keys['KeyW'] != keys['KeyS'] && keys['KeyA'] != keys['KeyD']

    console.log(isDiagonal)

    if (isDiagonal) delta *= 1 / Math.sqrt(2)

    let up = 0
    let down = 0
    let left = 0
    let right = 0
    if (keys['KeyW']) up = 1
    if (keys['KeyS']) down = 1
    if (keys['KeyA']) left = 1
    if (keys['KeyD']) right = 1

    dot.position.z = player.position.z + -delta * up + +delta * down
    dot.position.x = player.position.x + -delta * left + +delta * right

    // console.log(keys['KeyW'], keys['KeyA'], keys['KeyS'], keys['KeyD'])

    // ---

    if (moveX != 0 || moveY != 0) {
      dot.position.x = player.position.x + moveX * 1.5
      dot.position.z = player.position.z - moveY * 1.5
    }

    // ---

    let deltaX = 0
    let deltaY = 0

    deltaX = dot.position.x - player.position.x
    deltaY = dot.position.z - player.position.z

    const magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2)

    // Normalize
    if (magnitude != 0) {
      deltaX = deltaX / magnitude
      deltaY = deltaY / magnitude
    }

    player.position.x += deltaX * 0.125
    player.position.z += deltaY * 0.125

    // Move camera
    camera.position.x = player.position.x + 0
    camera.position.y = player.position.y + 9
    camera.position.z = player.position.z + 4

    camera.lookAt(player.position)

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

// let installPrompt: Event
// deno-lint-ignore no-explicit-any
let installPrompt: any

//(e: Event) => {
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
