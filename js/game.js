// this is attempting to simulate DSR Phase 4 from the MMORPG Final Fantasy XIV
// this code is incredibly inefficient but i honestly have 0 clue as to how i would at all truncate all these
// 'if this condition then this outcome' type mechanics for this phase into nice for loops

/* map for relevant phase 4 positions that i will be using as code

   12o   6o   7o                         18o
         2o                              14o
 11o 5o (1o) 3o         21o         17o (13o) 15o 19o
         4o                              16o
   10o   9o   8o        0o               20o
         
*/

// player character role
var role_type = 0; // 0 for dps, 1 for supp
var role_category = 1; // 0 for melee, 1 for ranged
var role_position = 1; // position type as it pertains to raid plan, 1 or 2 (0 = 1, 1 = 2)
var role_idx = 0; // see orders array comment

// i.e. a player with type 1, category 0, position 0, is main tank for 'support melee pos1' whereas 0,1,1 is typically caster, but any ranged dps works, the r2 position

// game rule variables
var stage = 0; // stage means at what step is the mechanic
var failed = false; // disables evaluation and progressing screen when true
var chain_type = 0; // 1 for red, 2 for blue

// var dives_position = 0; // 0 -> inside eye, 1-4 cw starting N
// var first_hit = 0; // 0 no hit, 1 cw-first, 2, ccw-first
var player_position = 0; // tracks current loc (for dives)
var player_cw_most = 0; // 0 n/a, 1 cw, 2 ccw
var player_correct = 0; // tracks correct option for dives

// desired positions - ordered: (0) m1, (1) m2, (2) r1, (3) r2, (4) mt, (5) ot, (6) h1, (7) h2
var static_order = [[5,5,2,4,15,15,14,16], // pre-pos
                    [11,11,2,4,19,19,14,16], // popping 1
                    [2,4,2,4,14,16,14,16], // swaps
                    [0,0,6,9,0,0,18,20], // popping 2 (refer to away order for finding valid melee)
                    [1,1,12,10,1,1,7,8]]; // dives preposition
var away_order = [2,4,6,9,14,16,18,20]; // where melees should NOT be for pop 2
var dives_order = [];

// general use functions
function game_reset() {
    stage = 0;
    failed = false;
    chain_type = 0;
    player_position = 0;

}

// selection functions
// changes class type (i.e. dps/supp + melee/ranged)
function change_role(type, category) {
    
    role_type = type;
    role_category = category;
    role_idx = 0;

    if (type == 1) {
        role_idx += 4;
    }

    if (category == 1) {
        role_idx += 2;
    }

    if (role_position == 1) {
        role_idx += 1;
    }

}

// changes the position (i.e. r1 -> r2, m1 -> m2, h2 -> h1, etc..)
function position_swap() {

    if (role_position == 0) {
        role_position = 1;
        role_idx += 1;
    }

    else if (role_position == 1) {
        role_position = 0;
        role_idx -= 1;
    }
}

// gameplay functions
// swaps chain type
function chain_swap() {
    if (chains == 1) {
        chains = 2;
    } else if (chains == 2) {
        chains = 1; 
    }
}

// makes 50/50 coin toss for your chains
function generate_chains() {
    let random_int = Math.floor(Math.random * 2);
    if (random_int == 0) {
        chain_type = 1;
    } else {
        chain_type = 2;
    }
}

// makes decision for dives
function generate_dive_hits(is_first) {

        // make a possible solution algorithm to track where player should go next..?
        // use combination of current position + role position
        // this should be able to solve it..?

        possible_hits = [7,8,10,12]; // spots starting N, going cw

        let random_int = Math.floor(Math.random * 4);
        let first_hit = possible_hits[random_int];
        possible_hits.splice(random_int, 1);

        random_int = Math.floor(Math.random * 3);
        let second_hit = possible_hits[random_int];
        possible_hits.splice(random_int, 1);

        // matters the first time to track cw-ness of hits for the players
        if (is_first == true && role_category == 1) {
            if (first_hit < second_hit) {
                player_cw_most = 1;
            } else {
                player_cw_most = 2;
            }
        }
}

function evaluate_choice(choice) {

    if (failed == true) {
        return 0;
    }

    // chains assignment
    if (stage == 0) {

        // red chains
        if (chains == 1) {
            if (role_category == 0) {
                // dont swap = correct (melee)
                if (choice == 21) {
                    failed = true;
                }
            } else {
                // swap = correct (ranged)
                if (choice != 21) {
                    failed = true;
                }
                chain_swap();
            }

        // blue chains
        } else if (chains == 2) {
            if (role_category == 0) {
                // swap = correct (melee)
                if (choice == 21) {
                    failed = true;
                }
            } else {
                // dont swap = correct (ranged)
                if (choice != 21) {
                    failed = true;
                }
                chain_swap();
            }
        }
    }

    // bubbles positioning + bubble pop (melee) + chain swaps
    if (1 <= stage <= 3) {
        if (choice != static_order[stage-1][role_idx]) {
            failed = true;
        }
    }

    // bubble pop (ranged)
    if (stage == 4) {

        if (role_category == 1) { // ranged

            if (choice != static_order[stage-1][role_idx]) {
                failed = true;
            }

        }
        else { // melee

            for (let i = 0; i < away_order.length(); i++) {
                if (choice == away_order[i]) {
                    failed = true;
                }
            }

        }
    }

    // dives positioning
    if (stage == 5) {
        if (choice != static_order[stage-1][role_idx]) {
            failed = true;
        } else {
            player_position = choice;
            generate_dive_hits(true);
        }

    }

    // dives 1
    if (stage == 6) {

        // needs some way to track which role is getting hit, where each other role is at
        // maybe tracking role positions and just automating it outside of the player
        // then if player mismatches the auto play, make that a fail ..?
        // tanks replacing

    }

    // dives 2
    if (stage == 7) {

        // melee replacing

    }

    // dives 3
    if (stage == 8) {

        // first two hit replacing, cw-first replacing cw-first, ccw-first replacing ccw-first

    }

    stage += 1;
    // if (failed == false) {
    //     player_position = choice;
    // }

}