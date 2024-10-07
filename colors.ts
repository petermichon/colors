import { Canvas } from "./io/canvas";
import { Mouse } from "./io/mouse";
import { World } from "./world";

import {
    getKeyboardInputs,
    getMouseInputs,
    getCanvasSize,
    calculateFPS,
} from "./systems/A_get";
import {
    updateFPS,
    updateTarget,
    updateMovementsFromInputs,
    shootBullet,
    updateLifetime,
} from "./systems/B_update";
import {
    moveToCursorOnGrid,
    moveToTarget,
    moveRandomly,
    moveFromInputs,
    moveToDirection,
} from "./systems/C_move";
import { sumDeltaMovements } from "./systems/D_sync";
import { showOnGrid, showOnCanvas, showTextOnCanvas } from "./systems/E_show";

export function loadEntities() {
    // World.add({
    //     type: "system-keyboard",
    //     getKeyboardInputs,
    //     inputs: { up: false, down: false, left: false, right: false },
    // });

    World.add({
        type: "system-mouse",
        getMouseInputs,
        setMouse(x: number, y: number) {
            Mouse.x = x;
            Mouse.y = y;
        },
        x: 0,
        y: 0,
        inputs: { shoot: false },
    });

    World.add({
        type: "system-canvas",
        beginAnimation() {
            Canvas.setAnimation(this.animation);
            Canvas.beginAnimation();
        },
        animation() {
            World.query((e) => e.updateEntities)[0].updateEntities();
        },
        getZoom() {
            return this.zoom;
        },
        zoom: 1,
    });

    World.add({
        type: "system-fps",
        calculateFPS,
        fps: 0,
        lastFrameUpdate: performance.now(),
    });

    World.add({
        type: "system-ecs",
        updateEntities() {
            for (let system of this.systems) {
                for (let currentEntity of World.entities) {
                    if (currentEntity[system.update.name]) {
                        system.update(currentEntity);
                    }
                }
            }
        },
        systems: [
            { update: calculateFPS },
            // { update: getKeyboardInputs },
            { update: getMouseInputs },
            { update: getCanvasSize },
            // ---
            { update: updateTarget },
            { update: updateFPS },
            // { update: updateMovementsFromInputs },
            { update: shootBullet },
            { update: updateLifetime },
            { update: revealOnClick },
            // ---
            { update: moveFromInputs },
            { update: moveToCursorOnGrid },
            { update: moveRandomly },
            { update: moveToTarget },
            { update: moveToDirection },
            // ---
            { update: sumDeltaMovements },
            // ---
            { update: showOnCanvas },
            { update: showOnGrid },
            { update: showTextOnCanvas },
        ],
    });

    World.add({
        type: "background",
        showOnCanvas,
        getCanvasSize,
        x: 0,
        y: 0,
        width: Canvas.getWidth(),
        height: Canvas.getHeight(),
        color: "#242424",
    });

    // --- Grid ---

    World.add({
        type: "mouse",
        // showOnGrid,
        moveToCursorOnGrid,
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        color: "#EEEEEE",
    });

    loadShooter();
    // loadMinesweeper();
}

export function loadShooter() {
    World.add({
        type: "player",
        showOnGrid,
        sumDeltaMovements,
        updateMovementsFromInputs,
        moveFromInputs,
        shootBullet,
        x: 80,
        y: 80,
        width: 32,
        height: 32,
        dx: [],
        dy: [],
        speed: 8,
        color: "#EEEEEE",
        inputs: { up: false, down: false, left: false, right: false },
    });

    World.add({
        type: "fps",
        showTextOnCanvas,
        updateFPS,
        x: 20,
        y: 30,
        text: "FPS: 0",
        color: "#EEEEEE",
    });

    for (let i = 0; i < 5; i++) {
        World.add({
            type: "bot",
            showOnGrid,
            sumDeltaMovements,
            moveRandomly,
            moveFromInputs,
            // moveToTarget,
            // updateTarget,
            x: 600 + i * 100,
            y: 450,
            dx: [],
            dy: [],
            width: 32,
            height: 32,
            color: "#48EEB3",
            speed: 16,
            // target: { x: 0, y: 0 },
            inputs: { up: false, down: false, left: false, right: false },
        });
    }
}

export function loadMinesweeper() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            World.add({
                type: "block",
                showOnGrid,
                revealOnClick,
                x: 128 + x * 54,
                y: 256 + y * 54,
                width: 48,
                height: 48,
                color: "#EEEEEE",
                mine: Math.random() < 0.1 ? true : false,
                block_x: x,
                block_y: y,
            });
        }
    }
}

function revealOnClick(entity: any) {
    {
        const mouse = World.query((e) => e.getMouseInputs)[0];
        if (!mouse.inputs.shoot) return;
    }

    const mouse = World.query((e) => e.moveToCursorOnGrid)[0];
    if (mouse.x < entity.x || mouse.y < entity.y) return;
    if (mouse.x > entity.x + entity.width || mouse.y > entity.y + entity.height)
        return;

    if (entity.mine) {
        entity.color = "#EE1111";
        entity.revealOnClick = undefined;
        // entity.type = "mine";
    } else {
        World.remove(entity);

        let mines = 0;

        const blocks = World.query((e) => e.type == "block");
        for (const block of blocks) {
            if (block.mine) {
                for (let x = -1; x < 2; x++) {
                    for (let y = -1; y < 2; y++) {
                        if (
                            block.block_x == entity.block_x + x &&
                            block.block_y == entity.block_y + y
                        ) {
                            mines += 1;
                        }
                    }
                }
            }
        }

        if (mines == 0) return;

        World.add({
            type: "text",
            showTextOnCanvas,
            x: entity.x + entity.width / 2,
            y: entity.y + entity.height / 2,
            text: mines.toString(),
            color: "#EEEEEE",
        });
    }
}
