// utilities
import { init } from './utilities/init.js'
import { ascii } from './utilities/ascii.js'
import { transition, tween, set_state } from './utilities/tween.js'
import { addCube, addText } from './utilities/geometry.js'
import { initGUI } from './utilities/index2gui.js'

// global vars
let scroll = 0;
let page_state = 0;
const bgcolor = 0x111111;
const fgcolor = 0xffffff;
const debug = {
    pagestate: page_state,
    ascii: false
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

const transition_vars = {
    elapsed: 0,
    time: 2,
    type: 1
}

// input tracking
const keyStates = {};

// initialize
const [clock, scene, camera, mainLight, directionalLight, renderer, mainContainer] = init( animate, document, bgcolor );

// ascii effect
const [effect, asciiContainer] = ascii( renderer, fgcolor );

// set camera state to 0
set_state(cam_position, cam_rotation, camera);
transition(cam_position, cam_rotation, 1, 0);

// gui setup
initGUI(asciiContainer, mainContainer, debug, cam_position, cam_rotation, transition_vars, camera);

// test cubes
addCube(0, 0, 0, 2, 2, 2, fgcolor, scene);
//addCube(2, 2, 2, 2, 2, 2, scene);
addCube(10, 0, 0, 1, 1, 1, fgcolor, scene);

// test text
addText(0, 3, 0, 0.3, 0, 0, 'meows', 1.8, 0.1, fgcolor, scene);

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
        transition_vars.elapsed = 0;
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

    if (debug.ascii == false) {
        renderer.render( scene, camera );
    } else {
        effect.render( scene, camera );
    }

    if (transition_vars.elapsed <= transition_vars.time) {
        let [x, y, z, rx, ry, rz] = tween(cam_position, cam_rotation, transition_vars);
        camera.position.set(x, y, z);
        camera.rotation.set(rx, ry, rz);
        transition_vars.elapsed += delta;
    }

    debug.pagestate = page_state;

    // if ( keyStates[ 'KeyW' ] ) { cube.rotation.x -= 1 * delta; }
    // if ( keyStates[ 'KeyA' ] ) { cube.rotation.y += 1 * delta; }
    // if ( keyStates[ 'KeyS' ] ) { cube.rotation.x += 1 * delta; }
    // if ( keyStates[ 'KeyD' ] ) { cube.rotation.y -= 1 * delta; }

}
