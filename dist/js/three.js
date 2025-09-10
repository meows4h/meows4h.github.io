import * as THREE from 'https://unpkg.com/three@0.174.0/build/three.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x0ffaf0 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}

window.addEventListener('resize',()=>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

let speed_factor = 0;
let speed_up = 1;

function animate() {
  if (speed_up == 1 && speed_factor < 3) {
      speed_factor += 0.01 * (speed_factor + 0.01);
  } else if (speed_factor > 3) {
      speed_up = 0;
  }

  if (speed_up == 0 && speed_factor > 0.05) {
      speed_factor -= 0.01 * (speed_factor + 0.01);
  } else if (speed_factor < 0.05) {
      speed_up = 1;
  }
  cube.rotation.x += 0.01 * speed_factor;
  cube.rotation.y += 0.01 * speed_factor;
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
