import { World } from "../world";

import { moveToDirection } from "./C_move";
import { sumDeltaMovements } from "./D_sync";
import { showOnGrid } from "./E_show";

export function updateFPS(entity: any) {
    const fps = World.query((e) => e.calculateFPS)[0].fps;
    entity.text = `FPS: ${Math.round(fps)}`;
}

export function updateTarget(entity: any) {
    const mouse = World.query((e) => e.moveToCursorOnGrid)[0];
    entity.target.x = mouse.x;
    entity.target.y = mouse.y;
}

export function updateMovementsFromInputs(entity: any) {
    const e = World.query((e) => e.getKeyboardInputs)[0];
    entity.inputs = e.inputs;
}

export function shootBullet(entity: any) {
    {
        const mouse = World.query((e) => e.getMouseInputs)[0];
        if (!mouse.inputs.shoot) return;
    }

    const mouse = World.query((e) => e.moveToCursorOnGrid)[0];
    const dx = mouse.x - (entity.x + entity.width / 2);
    const dy = mouse.y - (entity.y + entity.height / 2);
    const distance = Math.hypot(dx, dy);
    const direction = {
        dx: Math.round((dx / distance) * 24),
        dy: Math.round((dy / distance) * 24),
    };

    World.add({
        showOnGrid,
        moveToDirection,
        sumDeltaMovements,
        updateLifetime,
        x: entity.x + entity.width / 2 - 16 / 2,
        y: entity.y + entity.height / 2 - 16 / 2,
        dx: [],
        dy: [],
        direction: direction,
        width: 16,
        height: 16,
        color: "#EEA0A0",
        lifetime: 30,
    });
}

export function updateLifetime(entity: any) {
    if (entity.lifetime <= 0) {
        World.remove(entity);
    }
    entity.lifetime--;
}

// export function checkIfHitByBullet(entity: any) {
//     const bullets = World.query((e) => e.shootBullet);

// }
