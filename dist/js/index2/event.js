function scroll(page, trans, change) {

    if (trans.waited >= trans.lockout) {
            let scroll_old = page.scroll;
            let page_old = page.state;

            page.scroll += change;
            if (page.scroll > scroll_old) page.state--;
            else if (page.scroll < scroll_old) page.state++;

            if (page.state < 0) page.state = 0;
            else if (page.state > page.total) page.state = page.total;
            else {
                set_state(cam_position, cam_rotation, camera);
                transition(cam_position, cam_rotation, page_old, page.state);
                trans.elapsed = 0;
                trans.waited = 0;
            }
        }

}

export function initEvents(page, trans, keys, touch, document) {

    document.addEventListener( 'keydown', ( event ) => {

        keys[ event.code ] = true;

    } );

    document.addEventListener( 'keyup', ( event ) => {

        keys[ event.code ] = false;

    } );

    document.addEventListener( 'wheel', ( event ) => {

        scroll(page, trans, event.deltaY * -1);

    } );

    document.addEventListener('touchstart', (event) => {

        touch.startY = event.touches[0].clientY;

    } );

    document.addEventListener('touchend', (event) => {

        touch.endY = event.changedTouches[0].clientY;
        handleScroll(page, trans, touch.endY - touch.startY);

    } );

}
