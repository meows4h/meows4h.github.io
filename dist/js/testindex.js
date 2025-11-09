import * as THREE from 'three';

// additional effects / libraries
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// global vars
let render_ascii = false;

let scroll = 0;
let page_state = 0;

let target_x, target_y, target_z, curr_x, curr_y, curr_z;
let tar_rot_x, tar_rot_y, tar_rot_z, rot_x, rot_y, rot_z;
let time_elapsed = 0;
let transition_time = 2;
let transition_amp = 1;
let linear_trans = false;
let total_shift = 0;
let last_shift = { y_cord: 0, time: 0 };

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

// set camera targets
transition(1);

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
gui.add( { linear: false }, 'linear' )
    .onChange( function ( value ) {

        linear_trans = value;

    } );


// test cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
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
    }

    transition(old_state);

} );

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function tween(delta) {

    let x_val, y_val, z_val, x_rot, y_rot, z_rot;

    if (linear_trans == true) {

        let time_shift = time_elapsed / transition_time; // getting value from 0 to 1

        x_val = curr_x + ((target_x - curr_x) * time_shift);
        y_val = curr_y + ((target_y - curr_y) * time_shift);
        z_val = curr_z + ((target_z - curr_z) * time_shift);

        x_rot = rot_x + ((tar_rot_x - rot_x) * time_shift);
        y_rot = rot_y + ((tar_rot_y - rot_y) * time_shift);
        z_rot = rot_z + ((tar_rot_z - rot_z) * time_shift);

    } else {

        let amp = (transition_amp * (Math.PI / 2)) / transition_time;
        let period = (1 / transition_time) * Math.PI;
        let sine_out = amp * Math.sin(period * time_elapsed);

        let x_change = time_elapsed - last_shift.time; // x axis shift
        let tri_height = sine_out - last_shift.y_cord; // height of triangle at top
        let rram = x_change * sine_out; // right riemann
        let triangle = (x_change * tri_height) / 2;
        // if (triangle < 0) { triangle = 0; }
        let area = rram + triangle;

        // alternative solution : change to rram and keep rram + triangle, which might overshoot
        // better to overshoot than undershoot

        total_shift += area;
        last_shift.time = time_elapsed;
        last_shift.y_cord = sine_out;

        if (total_shift >= transition_amp) {
            total_shift = transition_amp;
        }

        x_val = curr_x + ((target_x - curr_x) * total_shift);
        y_val = curr_y + ((target_y - curr_y) * total_shift);
        z_val = curr_z + ((target_z - curr_z) * total_shift);

        x_rot = rot_x + ((tar_rot_x - rot_x) * total_shift);
        y_rot = rot_y + ((tar_rot_y - rot_y) * total_shift);
        z_rot = rot_z + ((tar_rot_z - rot_z) * total_shift);

    }
    
    camera.position.set(x_val, y_val, z_val);
    camera.rotation.set(x_rot, y_rot, z_rot);

}

function transition(old_state) {

    if (old_state == page_state) {
        return;
    }

    time_elapsed = 0;
    total_shift = 0;

    curr_x = camera.position.x;
    curr_y = camera.position.y;
    curr_z = camera.position.z;

    rot_x = camera.rotation.x;
    rot_y = camera.rotation.y;
    rot_z = camera.rotation.z;

    if (page_state == 0) {

        target_x = 0;
        target_y = 0;
        target_z = 5;
        tar_rot_x = 0;
        tar_rot_y = 0;
        tar_rot_z = 0;

    } else if (page_state == 1) {

        target_x = 5;
        target_y = 5;
        target_z = 0;
        tar_rot_x = degreesToRadians( 90 );
        tar_rot_y = 0;
        tar_rot_z = 0;

    } else if (page_state == 2) {

        target_x = 0;
        target_y = 0;
        target_z = 0;
        tar_rot_x = 0;
        tar_rot_y = 0;
        tar_rot_z = 0;

    }

}

function animate() {

    const delta = clock.getDelta();

    if (render_ascii == false) {
        renderer.render( scene, camera );
    } else {
        effect.render( scene, camera );
    }

    if (time_elapsed <= transition_time) {
        tween(delta);
        time_elapsed += delta;
    }

    if ( keyStates[ 'KeyW' ] ) { cube.rotation.x -= 1 * delta; }
    if ( keyStates[ 'KeyA' ] ) { cube.rotation.y += 1 * delta; }
    if ( keyStates[ 'KeyS' ] ) { cube.rotation.x += 1 * delta; }
    if ( keyStates[ 'KeyD' ] ) { cube.rotation.y -= 1 * delta; }

}
