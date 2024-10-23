// import { Canvas } from "./io/canvas";
// import { World } from "./world";

// import { loadEntities } from "./colors";

import * as THREE from "three";

export function old() {
    // loadEntities();
    // {
    //     const e = World.query((e) => e.setMouse)[0];
    //     const x = Math.trunc(Canvas.getWidth() / 2);
    //     const y = Math.trunc(Canvas.getHeight() / 2);
    //     e.setMouse(x, y);
    //     e.setMouse = undefined;
    // }
    // console.log("test1");
    // World.query((e) => e.beginAnimation)[0].beginAnimation();
}

export default function main() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(90, width / height);
    camera.position.z = 1;

    // Scene
    const scene = new THREE.Scene();

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    // Elements
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate(time: number) {
        {
            // Auto resize canvas
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
        }

        mesh.rotation.x = time / 2000;
        mesh.rotation.y = time / 1000;

        renderer.render(scene, camera);
    }
}
