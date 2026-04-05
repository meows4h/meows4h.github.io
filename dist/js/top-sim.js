import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Octree } from 'three/addons/math/Octree.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';

import { Capsule } from 'three/addons/math/Capsule.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const timer = new THREE.Timer()

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x88ccee );
scene.fog = new THREE.Fog( 0x88ccee, 0, 900 );

const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotation.order = 'YXZ';

const fillLight1 = new THREE.HemisphereLight( 0x8dc1de, 0x00668d, 1.5 );
fillLight1.position.set( 2, 1, 1 );
scene.add( fillLight1 );

const container = document.getElementById( 'container' );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
container.appendChild( renderer.domElement );

const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
container.appendChild( stats.domElement );

// const sphereGeometry = new THREE.IcosahedronGeometry( 0.2, 5 );
// const sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xdede8d } );

// const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
// sphere.castShadow = true;
// sphere.receiveShadow = true;
// scene.add( sphere );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const playerVelocity = new THREE.Vector3();
const playerPosition = new THREE.Vector3();
const cameraOffset = new THREE.Vector3();

const maxCameraDist = 4;
const minCameraDist = 0.2;
const cameraIncrement = 0.1;
let currentCameraDist = maxCameraDist;
cameraOffset.y = currentCameraDist;

// floor

const vertex = new THREE.Vector3();
const color = new THREE.Color();

let floorGeometry = new THREE.PlaneGeometry( 20000, 20000, 1000, 1000 );
floorGeometry.rotateX( - Math.PI / 2 );

// vertex displacement

let position = floorGeometry.attributes.position;

for ( let i = 0, l = position.count; i < l; i ++ ) {

    vertex.fromBufferAttribute( position, i );

    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 20 - 10;

    position.setXYZ( i, vertex.x, vertex.y, vertex.z );

}

floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

position = floorGeometry.attributes.position;
const colorsFloor = [];

for ( let i = 0, l = position.count; i < l; i ++ ) {

    color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, THREE.SRGBColorSpace );
    colorsFloor.push( color.r, color.g, color.b );

}

floorGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsFloor, 3 ) );

const floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );

const floor = new THREE.Mesh( floorGeometry, floorMaterial );
scene.add( floor );

const keyStates = {};
document.addEventListener( 'keydown', ( event ) => {

    keyStates[ event.code ] = true;

} );

document.addEventListener( 'keyup', ( event ) => {

    keyStates[ event.code ] = false;

} );

container.addEventListener( 'mousedown', () => {

    document.body.requestPointerLock();

} );

document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        if (currentCameraDist < maxCameraDist) {
            currentCameraDist = currentCameraDist + cameraIncrement;
        }
    } else if (event.deltaY < 0) {
        if (currentCameraDist > minCameraDist) {
            currentCameraDist = currentCameraDist - cameraIncrement;
        }
    }
});

document.body.addEventListener( 'mousemove', ( event ) => {

    if ( document.pointerLockElement === document.body ) {

        camera.rotation.x -= event.movementX / 500;
        camera.rotation.y -= event.movementY / 500;

        camera.translateOnAxis(camera.rotation, currentCameraDist);

    }

} );


window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function controls() {

    if ( keyStates[ 'KeyW' ] ) {
        playerVelocity.x = 1;
    }
    else if ( keyStates[ 'KeyS' ] ) {
        playerVelocity.x = -1;
    } 
    else {
        playerVelocity.x = 0;
    }
    
    if ( keyStates[ 'KeyD' ] ) {
        playerVelocity.z = 1;
    }
    else if ( keyStates[ 'KeyA' ] ) {
        playerVelocity.z = -1;
    }
    else {
        playerVelocity.z = 0;
    }

    // if ( keyStates[ 'KeyR' ] ) {
    //     playerVelocity.x = 0;
    //     playerVelocity.z = 0;
    // }

}

function updatePlayer( deltaTime ) {

    const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);
    cube.position.add(deltaPosition);

}

function updateCamera() {

    camera.position = cube.position;
    camera.position.add(cameraOffset);
    camera.lookAt(cube.position);

}

function animate() {

    const STEPS_PER_FRAME = 1

    const deltaTime = Math.min( 0.05, timer.getDelta() ) / STEPS_PER_FRAME;

    for ( let i = 0; i < STEPS_PER_FRAME; i ++ ) {

        controls();

        updatePlayer( deltaTime );

        updateCamera();
        
    }

    renderer.render( scene, camera );

    stats.update();

}