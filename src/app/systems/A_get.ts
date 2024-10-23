import { Mouse } from "../io/mouse";
import { Keyboard } from "../io/keyboard";
import { Canvas } from "../io/canvas";

export function getMouseInputs(entity: any) {
    entity.x = Mouse.x;
    entity.y = Mouse.y;
    entity.inputs.shoot = Mouse.isButtonDown(0);
}

export function getKeyboardInputs(entity: any) {
    entity.inputs.up = Keyboard.isKeyDown("z");
    entity.inputs.left = Keyboard.isKeyDown("q");
    entity.inputs.down = Keyboard.isKeyDown("s");
    entity.inputs.right = Keyboard.isKeyDown("d");
}

export function calculateFPS(entity: any) {
    entity.fps = 1000 / (performance.now() - entity.lastFrameUpdate);
    entity.lastFrameUpdate = performance.now();
}

export function getCanvasSize(entity: any) {
    entity.width = Canvas.getWidth();
    entity.height = Canvas.getHeight();
}
