export class Mouse {
    static x: number;
    static y: number;
    static events: boolean[];

    static isButtonDown(button: number): boolean {
        return this.events[button];
    }

    private static setButtonState(event: MouseEvent, state: boolean) {
        this.events[event.button] = state;
    }

    static {
        // Mouse.events = new Array()
        Mouse.events = [];

        window.addEventListener("mousemove", (event) => {
            Mouse.x = event.clientX;
            Mouse.y = event.clientY;
        });

        window.addEventListener("mousedown", (event) => {
            Mouse.setButtonState(event, true);
        });
        window.addEventListener("mouseup", (event) => {
            Mouse.setButtonState(event, false);
        });
    }
}
