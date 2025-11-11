function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

export function tween(pos, rot, time_elapsed, trans_time, trans_type) {

    if (trans_time == 0) trans_time = 1;
    let time_shift = time_elapsed / trans_time;
    if (time_shift > 1) time_shift = 1;
    if (time_shift < 0) time_shift = 0;

    let shift;
    if (trans_type == 1) {
        shift = easeInOutSine(time_shift);
    } else if (trans_type == 2) {
        shift = easeInOutQuad(time_shift);
    } else if (trans_type == 3) {
        shift = easeOutCubic(time_shift);
    } else {
        shift = time_shift;
    }

    const x_val = pos.x + ((pos.tx - pos.x) * shift);
    const y_val = pos.y + ((pos.ty - pos.y) * shift);
    const z_val = pos.z + ((pos.tz - pos.z) * shift);

    const x_rot = rot.x + ((rot.tx - rot.x) * shift);
    const y_rot = rot.y + ((rot.ty - rot.y) * shift);
    const z_rot = rot.z + ((rot.tz - rot.z) * shift);
    
    return [x_val, y_val, z_val, x_rot, y_rot, z_rot];

}

export function set_state(pos, rot, camera) {
    pos.x = camera.position.x;
    pos.y = camera.position.y;
    pos.z = camera.position.z;

    rot.x = camera.rotation.x;
    rot.y = camera.rotation.y;
    rot.z = camera.rotation.z;
}

export function transition(pos, rot, old, curr) {

    if (old == curr) {
        return;
    }

    if (curr == 0) {

        pos.tx = 0;
        pos.ty = 0;
        pos.tz = 5;
        rot.tx = 0;
        rot.ty = 0;
        rot.tz = 0;

    } else if (curr == 1) {

        pos.tx = 5;
        pos.ty = 5;
        pos.tz = 0;
        rot.tx = degreesToRadians( -90 );
        rot.ty = degreesToRadians( -20 );
        rot.tz = degreesToRadians( -5 );

    } else if (curr == 2) {

        pos.tx = 0;
        pos.ty = 0;
        pos.tz = 5;
        rot.tx = degreesToRadians( -90 );
        rot.ty = 0;
        rot.tz = 0;

    }

}