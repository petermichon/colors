import { Mouse } from '../io/mouse.ts'
import { Keyboard } from '../io/keyboard.ts'
import { Canvas } from '../io/canvas.ts'

// deno-lint-ignore no-explicit-any
type Entity = any

export function getMouseInputs(entity: Entity) {
  entity.x = Mouse.x
  entity.y = Mouse.y
  entity.inputs.shoot = Mouse.isButtonDown(0)
}

export function getKeyboardInputs(entity: Entity) {
  entity.inputs.up = Keyboard.isKeyDown('z')
  entity.inputs.left = Keyboard.isKeyDown('q')
  entity.inputs.down = Keyboard.isKeyDown('s')
  entity.inputs.right = Keyboard.isKeyDown('d')
}

export function calculateFPS(entity: Entity) {
  entity.fps = 1000 / (performance.now() - entity.lastFrameUpdate)
  entity.lastFrameUpdate = performance.now()
}

export function getCanvasSize(entity: Entity) {
  entity.width = Canvas.getWidth()
  entity.height = Canvas.getHeight()
}
