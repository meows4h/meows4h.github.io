// utilities
import { initGlobals } from 'index2/globals.js'
import { initScene } from 'utilities/sceneinit.js'
import { ascii } from 'utilities/ascii.js'
import { transition, tween, set_state } from 'utilities/tween.js'
import { addCube, addOctahedron, addPlane, addText } from 'utilities/geometry.js'
import { initGUI } from 'index2/gui.js'
import { initEvents } from 'index2/event.js'

// global vars
const [page, colors, debug, cam_position, cam_rotation, transition_vars, keyStates, touchStates] = initGlobals();

// initialize scene
const [clock, scene, camera, mainLight, directionalLight, renderer, mainContainer] = initScene( animate, document, colors.bg );

// ascii effect
const [effect, asciiContainer] = ascii( renderer, colors.fg );

// set camera state to 0
set_state(cam_position, cam_rotation, camera);
transition(cam_position, cam_rotation, 1, 0);

// gui setup
initGUI(asciiContainer, mainContainer, debug, cam_position, cam_rotation, transition_vars, camera);

// add geometry
addOctahedron(0, 0, 0, 2.2, 0, colors.fg, scene);
addPlane(0, -8, 0, 90, 0, 0, 100, 100, colors.fg, scene);
addCube(10, 0, 0, 1, 1, 1, colors.fg, scene);
addText(0, 3, 0, 30, 0, 0, 'hello world', 1.8, 0.1, colors.fg, scene);

// event setup
initEvents(page, transition_vars, keyStates, touchStates, cam_position, cam_rotation, camera, document);

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

    transition_vars.waited += delta;
    debug.pagestate = page.state;
    // if ( keyStates[ 'KeyW' ] ) { cube.rotation.x -= 1 * delta; }
}
