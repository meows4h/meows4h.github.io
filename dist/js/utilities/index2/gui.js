import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { set_state } from 'utilities/tween.js'

export function initGUI(asciiCon, mainCon, debug, pos, rot, trans, camera) {

    const gui = new GUI( { width: 150 } );
    gui.add( { ascii: false }, 'ascii' )
        .onChange( function ( value ) {

            debug.ascii = value;

            if (value == true) {
                asciiCon.style.display = 'block';
                mainCon.style.display = 'none';
            } else {
                asciiCon.style.display = 'none';
                mainCon.style.display = 'block';
            }

        } );

    gui.add( { type: 1 }, 'type', 0, 3 )
        .onChange( function ( value ) {

            value = Math.floor(value);
            trans.type = value;

        } );

    gui.add( debug, 'pagestate' )
        .listen()
        .disable();

    const pos_set = gui.addFolder( 'Position' );
    pos_set.open( false );

    pos_set.add( pos, 'tx')
        .listen()
        .onChange( function ( value ) {
            set_state(pos, rot, camera);
            pos.tx = value;
            trans.elapsed = 0;
        } );
    pos_set.add( pos, 'ty')
        .listen()
        .onChange( function ( value ) {
            set_state(pos, rot, camera);
            pos.ty = value;
            trans.elapsed = 0;
        } );
    pos_set.add( pos, 'tz')
        .listen()
        .onChange( function ( value ) {
            set_state(pos, rot, camera);
            pos.tz = value;
            trans.elapsed = 0;
        } );

    const rot_set = gui.addFolder( 'Rotation' );
    rot_set.open( false );

    rot_set.add( rot, 'tx')
        .listen()
        .onChange( function ( value ) {
            set_state(pos, rot, camera);
            rot.tx = value;
            trans.elapsed = 0;
        } );
    rot_set.add( rot, 'ty')
        .listen()
        .onChange( function ( value ) {
            set_state(pos, rot, camera);
            rot.ty = value;
            trans.elapsed = 0;
        } );
    rot_set.add( rot, 'tz')
        .listen()
        .onChange( function ( value ) {
            set_state(pos, rot, camera);
            rot.tz = value;
            trans.elapsed = 0;
        } );

}