import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

export function ascii( renderer ) {

    const effect = new AsciiEffect ( renderer, ' .:-+*=@#█', { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';

    const asciiContainer = document.getElementById( 'ascii-container' );
    asciiContainer.appendChild( effect.domElement );

    return [effect, asciiContainer];

}
