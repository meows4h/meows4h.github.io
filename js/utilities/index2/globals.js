export function initGlobals() {

    const page = {
        scroll: 0,
        state: 0,
        total: 3
    }

    const colors = {
        fg: 0xfdfdfd,
        bg: 0x030303
    }

    const debug = {
        pagestate: page.state,
        ascii: false
    }

    const pos = {
        x: 0,
        y: 0,
        z: 5,
        tx: 0,
        ty: 0,
        tz: 5
    };

    const rot = {
        x: 0,
        y: 0,
        z: 0,
        tx: 0,
        ty: 0,
        tz: 0
    }

    const trans = {
        elapsed: 0,
        time: 2,
        type: 1,
        waited: 0,
        lockout: 1.8
    }

    // input tracking
    const keys = {};
    const touch = {
        startY: 0,
        endY: 0
    };

    return [page, colors, debug, pos, rot, trans, keys, touch];

}
