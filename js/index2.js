// import * as THREE from 'three';

// additional effects / libraries
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// utilties
import { init } from './utilities/init.js'
import { ascii } from './utilities/ascii.js'
import { transition, tween, set_state } from './utilities/tween.js'
import { addCube, addText } from './utilities/geometry.js'
import { initGUI } from './utilities/index2gui.js'

// global vars
let render_ascii = false;

let scroll = 0;
let page_state = 0;
const debug = {
    pagestate: page_state
}

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

// input tracking
const keyStates = {};

// initialize
const [clock, scene, camera, mainLight, directionalLight, renderer, mainContainer] = init( animate, document );

// ascii effect
const [effect, asciiContainer] = ascii(renderer);

// set camera state to 0
set_state(cam_position, cam_rotation, camera);
transition(cam_position, cam_rotation, 1, 0);

// gui setup
time_elapsed = initGUI(render_ascii, asciiContainer, mainContainer, debug, cam_position, cam_rotation, transition_type, camera, time_elapsed);
// const gui = new GUI( { width: 150 } );
// gui.add( { ascii: false }, 'ascii' )
//     .onChange( function ( value ) {

//         render_ascii = value;

//         if (value == true) {
//             asciiContainer.style.display = 'block';
//             mainContainer.style.display = 'none';
//         } else {
//             asciiContainer.style.display = 'none';
//             mainContainer.style.display = 'block';
//         }

//     } );
// gui.add( { type: 1 }, 'type', 0, 3 )
//     .onChange( function ( value ) {

//         value = Math.floor(value);
//         transition_type = value;

//     } );
// gui.add( debug, 'pagestate' )
//     .listen()
//     .disable();

// const pos_set = gui.addFolder( 'Position' );
// pos_set.open( false );
// pos_set.add( cam_position, 'tx')
//     .listen()
//     .onChange( function ( value ) {
//         set_state(cam_position, cam_rotation, camera);
//         cam_position.tx = value;
//         time_elapsed = 0;
//     } );
// pos_set.add( cam_position, 'ty')
//     .listen()
//     .onChange( function ( value ) {
//         set_state(cam_position, cam_rotation, camera);
//         cam_position.ty = value;
//         time_elapsed = 0;
//     } );
// pos_set.add( cam_position, 'tz')
//     .listen()
//     .onChange( function ( value ) {
//         set_state(cam_position, cam_rotation, camera);
//         cam_position.tz = value;
//         time_elapsed = 0;
//     } );

// const rot_set = gui.addFolder( 'Rotation' );
// rot_set.open( false );
// rot_set.add( cam_rotation, 'tx')
//     .listen()
//     .onChange( function ( value ) {
//         set_state(cam_position, cam_rotation, camera);
//         cam_rotation.tx = value;
//         time_elapsed = 0;
//     } );
// rot_set.add( cam_rotation, 'ty')
//     .listen()
//     .onChange( function ( value ) {
//         set_state(cam_position, cam_rotation, camera);
//         cam_rotation.ty = value;
//         time_elapsed = 0;
//     } );
// rot_set.add( cam_rotation, 'tz')
//     .listen()
//     .onChange( function ( value ) {
//         set_state(cam_position, cam_rotation, camera);
//         cam_rotation.tz = value;
//         time_elapsed = 0;
//     } );

// test cubes
addCube(0, 0, 0, 2, 2, 2, scene);
addCube(2, 2, 2, 2, 2, 2, scene);
addCube(10, 0, 0, 1, 1, 1, scene);

// test text
addText(0, 2, 0, 'six seven');

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
