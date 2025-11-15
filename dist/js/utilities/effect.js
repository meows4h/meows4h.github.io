import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';

function ascii( renderer, color ) {

    const effect = new AsciiEffect ( renderer, '   .:-+*=@#█', { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = color;
    effect.domElement.style.backgroundColor = 'black';

    const asciiContainer = document.getElementById( 'ascii-container' );
    asciiContainer.appendChild( effect.domElement );

    return [effect, asciiContainer];

}

function outline( renderer ) {

    const effect = new OutlineEffect ( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );

    const outlineContainer = document.getElementById( 'outline-container' );
    outlineContainer.appendChild( effect.domElement );

    return [effect, outlineContainer];

}

export function getEffects ( renderer, color ) {

    const [asciiEffect, asciiContainer] = ascii( renderer, color );
    const [outlineEffect, outlineContainer] = outline( renderer );
    const fx = {
        ascii: asciiEffect,
        asciiCon: asciiContainer,
        outline: outlineEffect,
        outCon: outlineContainer
    }

}
