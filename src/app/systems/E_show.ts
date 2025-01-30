import { Canvas } from '../io/canvas.ts'
import { World } from '../world.ts'

// deno-lint-ignore no-explicit-any
type Entity = any

export function showOnCanvas(entity: Entity) {
  Canvas.setColor(entity.color)
  Canvas.rectangle(entity.x, entity.y, entity.width, entity.height)
}

export function showTextOnCanvas(entity: Entity) {
  Canvas.setColor(entity.color)
  Canvas.text(entity.text, entity.x, entity.y)
}

export function showOnGrid(entity: Entity) {
  const zoom = World.query((e) => e.getZoom)[0].getZoom()

  Canvas.setColor(entity.color)

  const x = entity.x * zoom
  const y = entity.y * zoom
  const w = entity.width * zoom
  const h = entity.height * zoom
  Canvas.rectangle(x, y, w, h)
}
