import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export function addCube(x, y, z, sx, sy, sz, color, scene) {

    const geometry = new THREE.BoxGeometry(sx, sy, sz);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    scene.add(cube);

}

export function addOctahedron(x, y, z, r, d, color, scene) {

    const geometry = new THREE.OctahedronGeometry(r, d);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const octa = new THREE.Mesh(geometry, material);
    octa.position.set(x, y, z);
    scene.add(octa);
}

export function addText(x, y, z, rx, ry, rz, text, size, depth, color, scene) {

    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {

    const geometry = new TextGeometry(text, {

        font: font,
        size: size,
        depth: depth,
        curveSegments: 12,
        bevelEnabled: false,

    });

    geometry.computeBoundingBox();
    geometry.center();

    const material = new THREE.MeshBasicMaterial({ color: color });
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.set(x, y, z);
    textMesh.rotation.set(rx, ry, rz);
    
    scene.add(textMesh);
    });

}
