export class Keyboard {
  static events: boolean[]

  static {
    // Keyboard.events = new Array();
    Keyboard.events = []

    addEventListener('keydown', (event) => {
      Keyboard.setKeyState(event, true)
    })
    addEventListener('keyup', (event) => {
      Keyboard.setKeyState(event, false)
    })
  }

  // Could replace string with KeyboardEvent
  static isKeyDown(key: string): boolean {
    return Keyboard.events[key.charCodeAt(0)]
  }

  private static setKeyState(event: KeyboardEvent, state: boolean) {
    Keyboard.events[event.key.charCodeAt(0)] = state
  }
}
