function permuteParty() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8];
    return permute(arr);
}

function resetState() {
    var elements = document.querySelectorAll(".reset");
    elements.forEach(function (element) {
        element.remove();
    })
}

function startSigma() {
    // six random players need 1 stack
    // two hello worlds

    // first three 1 stack non world players = F
    // world + rest = away from F
    resetState();

    var shuffle = permuteParty();
    var j = 0;
    shuffle.forEach(function (i) {
        if (j < 6) {
            var player = document.getElementById(i);
            var dynamis = document.createElement("div");
            dynamis.classList.add("reset", "dyn1");
            player.append(dynamis);
            j++;
        }
    });

    shuffle = permuteParty();
    j = 0;
    var helloWorld = ["near", "distant"]
    shuffle.forEach(function (i) {
        if (j < 2) {
            var player = document.getElementById(i);
            var world = document.createElement("div");
            world.classList.add("reset", helloWorld[j]);
            player.appendChild(world);
            j++;
        }
    });
}

function startOmega1() {
    // four players need 2 stacks
    // four players need 1 stack
    // four hello worlds, 1st + 2nd in line
    resetState();

    var shuffle = permuteParty();
    var j = 0;
    shuffle.forEach(function (i) {
        var player = document.getElementById(i);
        var dynamis = document.createElement("div");
        if (j < 4) {
            dynamis.classList.add("reset", "dyn2");
        } else {
            dynamis.classList.add("reset", "dyn1");
        }
        player.append(dynamis);
        j++;
    });

    shuffle = permuteParty();
    j = 0;
    var helloWorld = ["near", "far"];
    var inLine = ["first", "second"];
    shuffle.forEach(function (i) {
        if (j < 4) {
            var player = document.getElementById(i);
            var world = document.createElement("div");
            // if the debuffs are wrong, consult this math maybe
            world.classList.add("reset", inLine[j % 2], helloWorld[Math.floor(j / 2)]);
            player.appendChild(world);
            j++;
        }
    });
}

function startOmega2() {
    // two players need 3 stacks
    // six players need 2 stacks
    // two hello worlds + 2nd in line
    resetState();

    var shuffle = permuteParty();
    var j = 0;
    var helloWorld = ["near", "distant"];
    shuffle.forEach(function (i) {
        var player = document.getElementById(i);
        var dynamis = document.createElement("div");
        if (j < 2) {
            dynamis.classList.add("reset", "dyn3");
        } else if (j < 4) {
            dynamis.classList.add("reset", "dyn2");
            var world = document.createElement("div");
            world.classList.add("reset", "second", helloWorld[j]);
            player.appendChild(world);
        } else {
            dynamis.classList.add("reset", "dyn2");
        }
        player.append(dynamis);
        j++;
    });
}

var sigmaButton = document.querySelector("#sigma")
sigmaButton.addEventListener("click", function(event) {
    startSigma();
});

var omega1Button = document.querySelector("#omega1")
omega1Button.addEventListener("click", function(event) {
    startOmega1();
});

var omega2Button = document.querySelector("#omega2")
omega2Button.addEventListener("click", function(event) {
    startOmega2();
});
