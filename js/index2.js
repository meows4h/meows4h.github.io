import * as THREE from 'three';

// additional effects / libraries
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// utilties
import { init } from './utilities/init.js'
import { ascii } from './utilities/ascii.js'
import { transition, tween, set_state } from './utilities/tween.js'

// global vars
let render_ascii = false;

let scroll = 0;
let page_state = 0;

const cam_position = {
    x: 0,
    y: 0,
    z: 5,
    tx: 0,
    ty: 0,
    tz: 5
};

const cam_rotation = {
    x: 0,
    y: 0,
    z: 0,
    tx: 0,
    ty: 0,
    tz: 0
}

let time_elapsed = 0;
let transition_time = 2;
let transition_type = 1;

// initialize
const [clock, scene, camera, mainLight, directionalLight, renderer, mainContainer] = init( animate );

// ascii effect
const [effect, asciiContainer] = ascii(renderer);

// set camera state to 0
transition(cam_position, cam_rotation, 1, 0);

// gui setup
const gui = new GUI( { width: 150 } );
gui.add( { ascii: false }, 'ascii' )
    .onChange( function ( value ) {

        render_ascii = value;

        if (value == true) {
            asciiContainer.style.display = 'block';
            mainContainer.style.display = 'none';
        } else {
            asciiContainer.style.display = 'none';
            mainContainer.style.display = 'block';
        }

    } );
gui.add( { type: 1 }, 'type', 0, 3 )
    .onChange( function ( value ) {

        value = Math.floor(value);
        transition_type = value;

    } );


// test cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// addt. cube
const cube2 = new THREE.Mesh(geometry, material);
cube2.position.set(2, 2, 2);
scene.add(cube);

// input tracking
const keyStates = {};

document.addEventListener( 'keydown', ( event ) => {

    keyStates[ event.code ] = true;

} );

document.addEventListener( 'keyup', ( event ) => {

    keyStates[ event.code ] = false;

} );

document.addEventListener( 'wheel', ( event ) => {

    let old_scroll = scroll;
    let old_state = page_state;
    scroll += event.deltaY * -1;
    if (scroll > old_scroll) {
        page_state--;
    } else if (scroll < old_scroll) {
        page_state++;
    }

    if (page_state < 0) {
        page_state = 0;
    } else if (page_state > 2) {
        page_state = 2;
    } else {
        set_state(cam_position, cam_rotation, camera);
        transition(cam_position, cam_rotation, old_state, page_state);
        time_elapsed = 0;
    }

} );

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    effect.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    const delta = clock.getDelta();

    if (render_ascii == false) {
        renderer.render( scene, camera );
    } else {
        effect.render( scene, camera );
    }

    if (time_elapsed <= transition_time) {
        let [x, y, z, rx, ry, rz] = tween(cam_position, cam_rotation, time_elapsed, transition_time, transition_type);
        camera.position.set(x, y, z);
        camera.rotation.set(rx, ry, rz);
        time_elapsed += delta;
    }

    if ( keyStates[ 'KeyW' ] ) { cube.rotation.x -= 1 * delta; }
    if ( keyStates[ 'KeyA' ] ) { cube.rotation.y += 1 * delta; }
    if ( keyStates[ 'KeyS' ] ) { cube.rotation.x += 1 * delta; }
    if ( keyStates[ 'KeyD' ] ) { cube.rotation.y -= 1 * delta; }

}
