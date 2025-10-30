// async wait
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// gets text array
function get_typewriter_array (text) {
  let typewriter_array = text.split("");
  return typewriter_array
}

// gets animation speed
function get_typing_pace (pace) {
  let rand_pace = pace * 1.5
  let const_pace = pace * 0.25
  return [rand_pace, const_pace]
}

// does typing animation, like a slow typewriter
async function typewriter_load(text, pace) {
  const typewriter_array = get_typewriter_array(text);
  let [rand_pace, const_pace] = get_typing_pace(pace);
  var typewriter_display = typewriter_array[0]
  for (let i = 0; i < text.length; i++) {
    var typedelay = (Math.random() * rand_pace) + const_pace;
    await sleep(typedelay);
    typewriter_display = typewriter_display.replace(/.$/, typewriter_array[i]);
    typewriter_display += "_";
    document.getElementById("typewriter").innerHTML = typewriter_display;
  }
  typewriter_display = typewriter_display.replace(/.$/, "")
  document.getElementById("typewriter").innerHTML = typewriter_display;
}