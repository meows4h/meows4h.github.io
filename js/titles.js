// async wait
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

let loading_text = "loading...";

// picks a random title from an array of titles
function random_title(titles) {

    // placeholder title
    let display_title = loading_text
    document.getElementById("title").innherHTML = display_title;

    // pick a number between 0 and 100
    var titlepick = (Math.random() * 100);

    // set incremental values that add up to 100 when multiplied by the number of title options
    const increments = (100 / titles.length);
    let lower_bound = 0;
    let upper_bound = increments;
    
    // debug output
    // console.log(`titlepick value: ${titlepick}`)
    // console.log(`inc, low, up: ${increments}, ${lower_bound}, ${upper_bound}`)
    // console.log(`titles length: ${titles.length}`)

    // iterate through each title index, if the random value between 0 and 100 is within the incremental range
    // select the title that falls between the two numbers
    for (let i = 0; i < titles.length; i++) {
        if (titlepick <= upper_bound && titlepick >= lower_bound) {
            display_title = titles[i]
        }
        upper_bound += increments
        lower_bound += increments
        document.getElementById("title").innerHTML = display_title;
    }
}

// cycles through titles
async function cycle_title(titles, rate) {
    
    // initialize
    let display_title = loading_text;
    document.getElementById("title").innerHTML = display_title;

    var cycle_rate = rate * 1000; // rate is in seconds, as wait function is in ms
    var length = titles.length; // length
    var iteration = 0; // iteration variable

    while (true) {

        // reset back to 0
        if (iteration >= length) {
            iteration = 0;
        }

        // set title based on index
        display_title = titles[iteration];
        document.getElementById("title").innerHTML = display_title;

        // wait then increment
        await sleep(cycle_rate)
        iteration += 1;
    }

}