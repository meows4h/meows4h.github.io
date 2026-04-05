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

const keyStates = {};
document.addEventListener( 'keydown', ( event ) => {

    keyStates[ event.code ] = true;

} );

document.addEventListener( 'keyup', ( event ) => {

    keyStates[ event.code ] = false;

} );

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function controls( deltaTime ) {

    if ( keyStates[ 'KeyW' ] ) {
        playerVelocity.x = 1
    }
    if ( keyStates[ 'KeyS' ] ) {
        playerVelocity.x = -1
    }
    if ( keyStates[ 'KeyD' ] ) {
        playerVelocity.z = 1
    }
    if ( keyStates[ 'KeyA' ] ) {
        playerVelocity.z = -1
    }
    if ( keyStates[ 'KeyR' ] ) {
        playerVelocity.x = 0
        playerVelocity.z = 0
    }

}

function updatePlayer() {
    if (playerVelocity.x > 0) {
        cube.position.x = cube.position.x + 1
    }
    if (playerVelocity.x < 0) {
        cube.position.x = cube.position.x - 1
    }
    if (playerVelocity.z > 0) {
        cube.position.z = cube.position.z + 1
    }
    if (playerVelocity.z < 0) {
        cube.position.z = cube.position.z - 1
    }

    playerPosition.y = cube.position.y
    playerPosition.x = cube.position.x
    playerPosition.z = cube.position.z

}

function updateCamera() {

    camera.lookAt(playerPosition)

}

function animate() {

    const STEPS_PER_FRAME = 1

    const deltaTime = Math.min( 0.05, timer.getDelta() ) / STEPS_PER_FRAME;

    for ( let i = 0; i < STEPS_PER_FRAME; i ++ ) {

        controls( deltaTime );

        updatePlayer()

        updateCamera()
        
    }

    renderer.render( scene, camera );

    stats.update();

}