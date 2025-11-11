// async wait
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let imgidx = 0;

// unfinished code, can grab by class and then iterate through the indexes and just hide and show divs based on idx
async function carousel(seconds) {

    var delay = 1000 * seconds; 

    while (true) {
        await sleep(delay);
    }

}