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

function outline( renderer ) {

    const effect = new OutlineEffect ( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );

    return effect;

}

export function getEffects ( renderer, color ) {

    const [asciiEffect, asciiContainer] = ascii( renderer, color );
    const outlineEffect = outline( renderer );
    const fx = {
        ascii: asciiEffect,
        asciiCon: asciiContainer,
        outline: outlineEffect,
    };

    return fx;

}
