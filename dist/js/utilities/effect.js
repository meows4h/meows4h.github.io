import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';

function ascii( renderer, color ) {

    const effect = new AsciiEffect ( renderer, '   .:-+*=@#█', { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = color;
    effect.domElement.style.backgroundColor = 'black';

    const container = document.getElementById( 'ascii-container' );
    container.appendChild( effect.domElement );

    return [effect, container];

}

function outline( renderer, document ) {

    const effect = new OutlineEffect ( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );

    const container = document.getElementById( 'outline-container' );
    // container.appendChild( effect.domElement );

    return [effect, container];

}

export function getEffects ( renderer, color, document ) {

    const [asciiEffect, asciiContainer] = ascii( renderer, color );
    const [outlineEffect, outlineContainer] = outline( renderer, document );
    const fx = {
        ascii: asciiEffect,
        asciiCon: asciiContainer,
        outline: outlineEffect,
        outCon: outlineContainer
    };

    return fx;

}
