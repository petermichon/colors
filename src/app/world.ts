export abstract class World {
  static entities: any[] = []

  static add(entity: any) {
    this.entities.push(entity)
  }

  static query(query: (entity: any) => boolean) {
    return this.entities.filter(query)
  }

  static remove(entity: any) {
    this.entities = this.entities.filter((e) => e !== entity)
  }
}
