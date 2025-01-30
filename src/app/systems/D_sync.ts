// deno-lint-ignore no-explicit-any
type Entity = any

export function sumDeltaMovements(entity: Entity) {
  let totaldx = 0
  let totaldy = 0
  for (let i = 0; i < entity.dx.length; i++) {
    totaldx += entity.dx[i]
    totaldy += entity.dy[i]
  }
  entity.x += totaldx
  entity.y += totaldy

  entity.dx = []
  entity.dy = []
}
