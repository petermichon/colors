// deno-lint-ignore no-explicit-any
type Entity = any

export abstract class World {
  static entities: Entity[] = []

  static add(entity: Entity) {
    this.entities.push(entity)
  }

  static query(query: (entity: Entity) => boolean) {
    return this.entities.filter(query)
  }

  static remove(entity: Entity) {
    this.entities = this.entities.filter((e) => e !== entity)
  }
}
