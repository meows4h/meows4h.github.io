// can change this later to be modifiable
let role_position = 0;
let step = 0;
let passCheck = false;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// randomly sorting an array
function permute(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function permuteOrder() {
    var arr = [0, 3, 6, 9];
    return permute(arr);
}

function permuteFours() {
    var arr = [0, 1, 2, 3];
    return permute(arr);
}

function permuteThrees() {
    var arr = [0, 1, 2];
    return permute(arr);
}

// there are 16 possible tower positions with come constraints
// there CANNOT be 0 nor 4 towers middle

// to handle this, i am checking each quadrant, starting at a random one
// checking each of the 3 related spots, rolling a 1/3 chance it spawns up to 2 spawning
// then moving to the next quadrant ; IF 6 spawn in the first three, the 4th quad will only have 1 tower
// after that sequence runs, it will fill in the rest of towers in the center

function generateTowers() {
    var towers = [];
    var quadArr = permuteOrder();
    var quadIndex = 0;

    var totalGen = 0;
    var currSetGen = 0;
    quadArr.forEach(function (quadNum) {
        currSetGen = 0
        var outerArr = permuteThrees();
        outerArr.forEach(function (towerNum) {
            // if quad has generated 2 or more
            // or if total outer towers is 7 or more
            // stop this set and go next
            if (currSetGen >= 2 || totalGen >= 7) {
                return;
            }

            if (currSetGen <= 0) {
                towers.push(quadNum + towerNum);
                currSetGen++;
                totalGen++;
            } else {
                // roll for chance + add tower
                let chance = getRandomInt(1, 3);
                if (totalGen <= 4 && quadIndex == 3) {
                    chance = 2;
                }
                if (chance == 2) {
                    towers.push(quadNum + towerNum);
                    currSetGen++;
                    totalGen++;
                }
            }
        });
        quadIndex++;
    });
    var innerArr = permuteFours();
    innerArr.forEach(function (towerNum) {
        // there are only 8 players. so no. not 9 towers.
        if (totalGen >= 8) {
            return;
        }
        towers.push(12 + towerNum);
        totalGen++;
    });
    return towers;
}

function hideTowers() {
    for (let i = 0; i < 16; i++) {
        let towerElement = document.getElementById(`tower${i}`);
        towerElement.style.display = "none";
    }
}

function movePlayer(playerID, leftPos, topPos) {
    let playerElement = document.getElementById(`player${playerID}`);
    playerElement.style.left = `${leftPos}`;
    playerElement.style.top = `${topPos}`;
}

function startGame() {
    passCheck = true;
    step = 0;

    // towers spots are 0 -> 11 starting north and going CW
    // the inner spots start NE 12 -> 15
    var towers = generateTowers();
    towers.forEach(function (towerNum) {
        let towerElement = document.getElementById(`tower${towerNum}`);
        towerElement.style.display = "block";
    });

    // supps are 1, dps 2
    var preyGroup = getRandomInt(1, 2);

    var choosePrey = permuteFours();
    var preyOne = choosePrey[0];
    var preyTwo = choosePrey[1];

    if (preyGroup == 2) {
        preyOne += 4;
        preyTwo += 4;
    }

    movePlayer(8, "190px", "230px");

}

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function() {
    hideTowers();
    startGame();
});