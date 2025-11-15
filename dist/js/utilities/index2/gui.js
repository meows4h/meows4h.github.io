import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { set_state } from 'utilities/tween.js'

export function initGUI(fx, debug, pos, rot, trans, camera) {

    const gui = new GUI( { width: 150 } );
    gui.add( fx, 'setEffect', { None: 'none', Ascii: 'ascii', Outline: 'outline' } )
    .onChange( function ( value ) {

        if (value == 'none') {
            fx.mainCon.style.display = 'block';
            fx.asciiCon.style.display = 'none';
            fx.outCon.style.display = 'none';
        } else if (value == 'ascii') {
            fx.mainCon.style.display = 'none';
            fx.asciiCon.style.display = 'block';
            fx.outCon.style.display = 'none';
        } else if (value == 'outline') {
            fx.mainCon.style.display = 'none';
            fx.asciiCon.style.display = 'none';
            fx.outCon.style.display = 'block';
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