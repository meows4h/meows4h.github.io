import * as THREE from 'three';

export function init( animate ) {

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
    
    const mainContainer = document.getElementById( 'main-container' );
    mainContainer.appendChild( renderer.domElement );

    return [clock, scene, camera, mainLight, directionalLight, renderer, mainContainer]

}
