import { World } from '../world.ts'

export function moveToCursorOnGrid(entity: any) {
  const mouse = World.query((e) => e.getMouseInputs)[0]
  const scale = World.query((e) => e.getZoom)[0].getZoom()

  entity.x = Math.trunc(mouse.x / scale)
  entity.y = Math.trunc(mouse.y / scale)
}

export function moveToTarget(entity: any) {
  const targetX = entity.target.x
  const targetY = entity.target.y

  const dx = targetX - entity.x
  const dy = targetY - entity.y

  const distance = Math.hypot(dx, dy)

  if (distance <= entity.speed) return

  entity.dx.push(Math.round(dx / distance))
  entity.dy.push(Math.round(dy / distance))
}

export function moveFromInputs(entity: any) {
  const inputs = entity.inputs

  // Convert inputs to direction
  let dx = (inputs.right ? 1 : 0) - (inputs.left ? 1 : 0)
  let dy = (inputs.down ? 1 : 0) - (inputs.up ? 1 : 0)

  // Avoid dividing by 0 & calculating nothing
  if (dx == 0 && dy == 0) return

  // Calculate diagonal speed : 1/(sqrt(x^2 + y^2))
  const diagonal = Math.hypot(dx, dy)
  const speed = entity.speed / diagonal

  dx *= speed
  dy *= speed

  dx = Math.round(dx)
  dy = Math.round(dy)

  entity.dx.push(dx)
  entity.dy.push(dy)
}

export function moveRandomly(entity: any) {
  const inputs = {
    up: Math.random() <= 0.01 ? true : false,
    left: Math.random() <= 0.01 ? true : false,
    down: Math.random() <= 0.01 ? true : false,
    right: Math.random() <= 0.01 ? true : false,
  }
  entity.inputs = inputs
}

export function moveToDirection(entity: any) {
  entity.dx.push(entity.direction.dx)
  entity.dy.push(entity.direction.dy)
  // console.log(entity.dx, entity.dy);
}
