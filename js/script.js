//--- The sprite object

var spriteObject = {
  sourceX: 0,
  sourceY: 0,
  sourceWidth: 50,
  sourceHeight: 36,
  width: 50,
  height: 36,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  visible: true,

  //Physics properties
  accelerationX: 0,
  accelerationY: 0,
  speedLimit: 5,
  friction: 0.96,
  bounce: -0.7,
  gravity: 0.3,
  jump: -2.6,

  //Getters
  centerX: function() {
    return this.x + (this.width / 2);
  },
  centerY: function() {
    return this.y + (this.height / 2);
  },
  halfWidth: function() {
    return this.width / 2;
  },
  halfHeight: function() {
    return this.height / 2;
  }
};

//--- The main program

//The canvas
var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

//Object arrays
var sprites = [];

// The background
var background = Object.create(spriteObject);
background.sourceY = 116;
background.sourceWidth = 600;
background.sourceHeight = 112;
background.width = 600;
background.height = 112;
background.x = 0;
background.y = canvas.height - 180;
sprites.push(background);

//The bird
var bird = Object.create(spriteObject);
bird.x = canvas.width / 2 - bird.halfWidth();
bird.y = canvas.height / 2 - bird.halfHeight();
sprites.push(bird);

var pipeOneTop = Object.create(spriteObject);
pipeOneTop.sourceX = 600;
pipeOneTop.sourceWidth = 66;
pipeOneTop.sourceHeight = 321;
pipeOneTop.width = 66;
pipeOneTop.height = 321;
pipeOneTop.x = canvas.width;
pipeOneTop.y = Math.random() + (-255 + 355) - 255;
sprites.push(pipeOneTop);

var pipeOneBot = Object.create(spriteObject);
pipeOneBot.sourceX = 600;
pipeOneBot.sourceY = 439;
pipeOneBot.sourceWidth = 66;
pipeOneBot.sourceHeight = 321;
pipeOneBot.width = 66;
pipeOneBot.height = 321;
pipeOneBot.x = canvas.width;
pipeOneBot.y = pipeOneTop.y + pipeOneTop.height + 118;
sprites.push(pipeOneBot);

var pipeTwoTop = Object.create(spriteObject);
pipeTwoTop.sourceX = 600;
pipeTwoTop.sourceWidth = 66;
pipeTwoTop.sourceHeight = 321;
pipeTwoTop.width = 66;
pipeTwoTop.height = 321;
pipeTwoTop.x = canvas.width + 225;
pipeTwoTop.y = Math.random() + (-255 + 355) - 255;
sprites.push(pipeTwoTop);

var pipeTwoBot = Object.create(spriteObject);
pipeTwoBot.sourceX = 600;
pipeTwoBot.sourceY = 439;
pipeTwoBot.sourceWidth = 66;
pipeTwoBot.sourceHeight = 321;
pipeTwoBot.width = 66;
pipeTwoBot.height = 321;
pipeTwoBot.x = canvas.width + 225;
pipeTwoBot.y = pipeTwoTop.y + pipeTwoTop.height + 118;
sprites.push(pipeTwoBot);

var pipeThreeTop = Object.create(spriteObject);
pipeThreeTop.sourceX = 600;
pipeThreeTop.sourceWidth = 66;
pipeThreeTop.sourceHeight = 321;
pipeThreeTop.width = 66;
pipeThreeTop.height = 321;
pipeThreeTop.x = canvas.width + 450;
pipeThreeTop.y = Math.random() + (-255 + 355) - 255;
sprites.push(pipeThreeTop);

var pipeThreeBot = Object.create(spriteObject);
pipeThreeBot.sourceX = 600;
pipeThreeBot.sourceY = 439;
pipeThreeBot.sourceWidth = 66;
pipeThreeBot.sourceHeight = 321;
pipeThreeBot.width = 66;
pipeThreeBot.height = 321;
pipeThreeBot.x = canvas.width + 450;
pipeThreeBot.y = pipeThreeTop.y + pipeThreeTop.height + 118;
sprites.push(pipeThreeBot);

//The floor
var floor = Object.create(spriteObject);
floor.sourceY = 46;
floor.sourceWidth = 600;
floor.sourceHeight = 70;
floor.width = 600;
floor.height = 70;
floor.x = 0;
floor.y = canvas.height - floor.height;
sprites.push(floor);

var floorTwo = Object.create(spriteObject);
floorTwo.sourceY = 46;
floorTwo.sourceWidth = 600;
floorTwo.sourceHeight = 70;
floorTwo.width = 600;
floorTwo.height = 70;
floorTwo.x = 600;
floorTwo.y = canvas.height - floorTwo.height;
sprites.push(floorTwo);

// Game over message
var gameOver = Object.create(spriteObject);
gameOver.sourceY = 228;
gameOver.sourceWidth = 300;
gameOver.sourceHeight = 58;
gameOver.width = 300;
gameOver.height = 58;
gameOver.x = canvas.width / 4;
gameOver.y = (canvas.height - gameOver.height * 3) / 2;
gameOver.visible = false;
sprites.push(gameOver);

// Play again message
var playAgain = Object.create(spriteObject);
playAgain.sourceY = 286;
playAgain.sourceWidth = 116;
playAgain.sourceHeight = 40;
playAgain.width = 116;
playAgain.height = 40;
playAgain.x = (canvas.width - playAgain.width) / 2;
playAgain.y = (canvas.height - playAgain.height) / 2;
playAgain.visible = false;
sprites.push(playAgain);

//Load image
var image = new Image();
image.src = "img/sprites.png";

//Game states
var PLAYING = 1;
var OVER = 2;
var gameState = PLAYING;

//Arrow key codes
var SPACEBAR = 32;

//Directions
var moveUp = false;

//Add keyboard listeners
window.addEventListener("keypress", function(event) {
  switch (event.keyCode) {
    case SPACEBAR:
      moveUp = true;
      break;
  }
}, false);

window.addEventListener("keyup", function(event) {
  switch (event.keyCode) {
    case SPACEBAR:
      moveUp = false;
      break;
  }
}, false);

update();

function hitTestCollision(b, p) {
  // Variable to determine collision
  var hit = false;

  // Calculate distance vector
  var vx = b.centerX() - p.centerX();
  var vy = b.centerY() - p.centerY();

  // Figure out combined half-widths and half-heights
  var combinedHalfWidths = b.halfWidth() + p.halfWidth();
  var combinedHalfHeights = b.halfHeight() + p.halfHeight();

  // Check for collision on X axis
  if (Math.abs(vx) < combinedHalfWidths) {
    // Check for collision on Y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true;
    } else {
      //There's no collision on the Y axis
      hit = false;
    }
  } else {
    //There's no collision on the X axis
    hit = false;
  }
  return hit;
}

function update() {
  //The animation loop
  requestAnimationFrame(update, canvas);

  pipeOneBot.y = pipeOneTop.y + pipeOneTop.height + 118;
  pipeTwoBot.y = pipeTwoTop.y + pipeTwoTop.height + 118;
  pipeThreeBot.y = pipeThreeTop.y + pipeThreeTop.height + 118;

  //Change what the game is doing based on the game state
  switch (gameState) {
    case PLAYING:
      playGame();
      break;

    case OVER:
      endGame();
      break;
  }

  //Render the game
  draw();
}

function endGame() {
  gameOver.visible = true;
  playAgain.visible = true;
}

function playGame() {
  //Set the bird's acceleration if the keys are being pressed
  //Up
  if (moveUp) {
    bird.accelerationY = -0.2;
    bird.gravity = 0;
    bird.friction = 1;
    bird.jump = -2.6;
  }

  //Set the bird's acceleration, friction and gravity 
  //to zero if none of the keys are being pressed
  if (!moveUp) {
    bird.accelerationY = 0;
    bird.jump = 0;
    bird.friction = 0.96;
    bird.gravity = 0.3;
  }

  //Apply the jump
  bird.vy += bird.jump;

  //Apply gravity
  bird.vy += bird.gravity;

  //Limit the speed
  if (bird.vy > bird.speedLimit * 2) {
    bird.vy = bird.speedLimit * 2;
  }
  if (bird.vy < -bird.speedLimit) {
    bird.vy = -bird.speedLimit;
  }

  //Move the bird
  bird.y += bird.vy;

  //Bounce off the screen edges
  //Up
  if (bird.y < 0) {
    bird.vy *= bird.bounce;
    bird.y = 0;
  }
  //Down
  if (bird.y + bird.height > floor.y) {
    bird.vy *= bird.bounce;
    bird.y = floor.y - bird.height;
  }

  // Move the floor
  floor.x -= 2;
  floorTwo.x -= 2;

  if (floor.x < -600) {
    floor.x = 0;
  }

  if (floorTwo.x < 0) {
    floorTwo.x = 600;
  }

  // Move the pipes
  pipeOneTop.x -= 2;
  pipeOneBot.x -= 2;
  pipeTwoTop.x -= 2;
  pipeTwoBot.x -= 2;
  pipeThreeTop.x -= 2;
  pipeThreeBot.x -= 2;

  // Reset the pipes x position
  if (pipeOneTop.x < 0 - pipeOneTop.width) {
    pipeOneTop.x = canvas.width;
    pipeOneTop.y = Math.random() * (-255 + 355) - 255;
  }
  if (pipeOneBot.x < 0 - pipeOneBot.width) {
    pipeOneBot.x = canvas.width;
    pipeOneBot.y = Math.random() * (-255 + 355) - 255;
  }
  if (pipeTwoTop.x < 0 - pipeTwoTop.width) {
    pipeTwoTop.x = canvas.width;
    pipeTwoTop.y = Math.random() * (-255 + 355) - 255;
  }
  if (pipeTwoBot.x < 0 - pipeTwoBot.width) {
    pipeTwoBot.x = canvas.width;
    pipeTwoBot.y = Math.random() * (-255 + 355) - 255;
  }
  if (pipeThreeTop.x < 0 - pipeThreeTop.width) {
    pipeThreeTop.x = canvas.width;
    pipeThreeTop.y = Math.random() * (-255 + 355) - 255;
  }
  if (pipeThreeBot.x < 0 - pipeThreeBot.width) {
    pipeThreeBot.x = canvas.width;
    pipeThreeBot.y = Math.random() * (-255 + 355) - 255;
  }

  // Detect collision
  if (sprites.length !== 0) {
    for (var i = 0; i < sprites.length; i++) {
      var sprite = sprites[i];
      if (sprite.visible) {
        // Check to see if they collide...

        if (hitTestCollision(bird, pipeOneTop) || hitTestCollision(bird, pipeOneBot) || hitTestCollision(bird, pipeTwoTop) || hitTestCollision(bird, pipeTwoBot) || hitTestCollision(bird, pipeThreeTop) || hitTestCollision(bird, pipeThreeBot) ) {
          console.log("Collision");
          gameState = OVER;
        }
        if (bird.y + bird.height == floor.y || bird.y + bird.height == floorTwo.y) {
          console.log("Hit floor!");
          gameState = OVER;
        }
      }
    }
  }
}

function draw() {
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);

  //Display the sprites
  if (sprites.length !== 0) {
    for (var i = 0; i < sprites.length; i++) {
      var sprite = sprites[i];
      if (sprite.visible) {
        drawingSurface.drawImage(
          image,
          sprite.sourceX, sprite.sourceY,
          sprite.sourceWidth, sprite.sourceHeight,
          Math.floor(sprite.x), Math.floor(sprite.y),
          sprite.width, sprite.height
        );
      }
    }
  }
}