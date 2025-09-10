// this definitely can be formatted better but it works for what it is worth; wrote this for my old website

// async wait
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var swapped = false;
var glitch_chars = ['$', '%', '&', '*', '@', '!', '+', '=', '#', '?', '>', '<', 'x'];

// creates array for the thing from a string
function make_glitch_array(glitch_text) {
  let glitch_array = glitch_text.split("");
  return glitch_array
}

// rebuilds the text string
function rebuild(text_display) {
  let text = "";
  for (let i = 0; i < text_display.length; i++) {
    text += text_display[i];
    document.getElementById("glitch").innerHTML = text;
  }
}

// random character + random pos and then subs it in
function glitch(glitch_array) {
  let randglitch = Math.floor(Math.random() * glitch_chars.length)
  let randplace = Math.floor(Math.random() * glitch_array.length)
  var text_display = []
  for (let i = 0; i < glitch_array.length; i++) {
    text_display[i] = glitch_array[i]
    if (i == randplace) {
      text_display[i] = glitch_chars[randglitch];
      swapped = true
    }
  }
  rebuild(text_display);
}

// resets back to the original input
function unglitch(glitch_array) {
  if (swapped = true) {
    swapped = false;
    rebuild(glitch_array);
  }
}

// run func
async function glitchrun(glitch_text) {
  const glitch_array = Object.freeze(make_glitch_array(glitch_text));
  while (true) {
    await sleep(500)
    glitch(glitch_array);
    await sleep(125)
    unglitch(glitch_array);
    await sleep(750)
  }
}
