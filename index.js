/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  createRock()

  const rockVertical = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (rockVertical > 360) {
    var dodgerLeftPosition = dodger.style.left.replace('px','');
    var dodgerLeftInteger = parseInt(dodgerLeftPosition, 10);

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightInteger = dodgerLeftInteger + 40;

    var rockLeftPosition = rock.style.left.replace('px','');
    var rockLeftInteger = parseInt(rockLeftPosition, 10);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightInteger = rockLeftInteger + 20;

    if (dodgerLeftInteger < rockRightInteger && dodgerRightInteger < rockLeftInteger) {
        /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge.
               */
      alert("Collision");
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */

  game.appendChild(rock) // MY NEW CODE
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame().
     */
     if (checkCollision(rock)) {
       endGame();
     }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM.
     */
     if (rockThree.style.bottom === "400px") {
       rockThree.remove();
     }
  }



  // We should kick off the animation of the rock around here.
  var top = 0

  function stepRock() {
    rock.style.top = `${top += 2}px`

    if (top < 400) {
      window.requestAnimationFrame(stepRock)
    }
  }
  window.requestAnimationFrame(stepRock)
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  var gameInterval = null

  function emptyRocksFromDOM() {
    while (ROCKS.children) {
      ROCKS.removeChild(ROCKS.firstChild);
    }
  }
  function freezeDodger() {
    keydown.stopPropogation();
    alert("YOU LOSE!")
  }

}

function moveDodger() {
  document.addEventListener('keydown', function(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
  }
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
  }
})
}

function moveDodgerLeft() {
  var positionValue = dodger.style.left.replace('px','');
  var positionInteger = parseInt(positionValue, 10);

  function stepLeft() {
    if (positionInteger > 0) {
      dodger.style.left = `${positionInteger - 4}px`
      window.requestAnimationFrame(stepLeft);
    }
  }
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
window.requestAnimationFrame(stepLeft);
}

function moveDodgerRight() {
  var positionValue = dodger.style.left.replace('px','');
  var positionInteger = parseInt(positionValue, 10);

  function stepRight() {
    if (positionInteger < 359) {
      dodger.style.left = `${positionInteger + 4}px`
      window.requestAnimationFrame(stepRight);
    }
  }
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(stepRight);
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
