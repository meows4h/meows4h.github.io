import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export function addCube(x, y, z, sx, sy, sz, scene) {

    const geometry = new THREE.BoxGeometry(sx, sy, sz);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    scene.add(cube);

}

export function addText(x, y, z, text, scene) {

    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const geometry = new TextGeometry(text, {
        font: font,
        size: 1,
        depth: 0.1,
        curveSegments: 12,
        bevelEnabled: false,
    });

    geometry.computeBoundingBox();
    geometry.center();

    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.set(x, y, z);
    textMesh.rotation.set(0.3, 0, 0);
    
    scene.add(textMesh);
    });

}
