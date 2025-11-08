import * as THREE from 'three';

// additional effects / libraries
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// global vars
let render_ascii = false;

// internal clock
const clock = new THREE.Clock();

// scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff ); // white fog
scene.fog = new THREE.Fog( 0xffffff, 0, 900 );

// camera settings
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotation.order = 'YXZ';
camera.position.z = 5;

// main lighting
const mainLight = new THREE.HemisphereLight( 0x8dc1de, 0x00668d, 1.5 );
mainLight.position.set( 2, 1, 1 );
scene.add( mainLight );

// directional lighting
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
directionalLight.position.set( - 5, 25, - 1 );
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = 0.01;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.right = 30;
directionalLight.shadow.camera.left = - 30;
directionalLight.shadow.camera.top	= 30;
directionalLight.shadow.camera.bottom = - 30;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.radius = 4;
directionalLight.shadow.bias = - 0.00006;
scene.add( directionalLight );

// renderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const main_container = document.getElementById( 'main-container' );
main_container.appendChild( renderer.domElement );

// ascii effect
const effect = new AsciiEffect ( renderer, ' .:-+*=@#█', { invert: true } );
effect.setSize( window.innerWidth, window.innerHeight );
effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';

const ascii_container = document.getElementById( 'ascii-container' );
ascii_container.appendChild( effect.domElement );

// gui setup
const gui = new GUI( { width: 150 } );
gui.add( { ascii: false }, 'ascii' )
    .onChange( function ( value ) {

        render_ascii = value;

        if (value == true) {
            ascii_container.style.display = 'block';
            main_container.style.display = 'none';
        } else {
            ascii_container.style.display = 'none';
            main_container.style.display = 'block';
        }

    } );


// test cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black color
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// input tracking
const keyStates = {};

document.addEventListener( 'keydown', ( event ) => {

    keyStates[ event.code ] = true;

} );

document.addEventListener( 'keyup', ( event ) => {

    keyStates[ event.code ] = false;

} );

function animate() {

    const delta = clock.getDelta();

    if (render_ascii == false) {
        renderer.render( scene, camera );
    } else {
        effect.render( scene, camera );
    }

    if ( keyStates[ 'KeyW' ] ) { cube.rotation.x += 1 * delta; }
    if ( keyStates[ 'KeyA' ] ) { cube.rotation.y -= 1 * delta; }
    if ( keyStates[ 'KeyS' ] ) { cube.rotation.x -= 1 * delta; }
    if ( keyStates[ 'KeyD' ] ) { cube.rotation.y += 1 * delta; }
    

}
