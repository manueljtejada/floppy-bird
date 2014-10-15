//--- The main program

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
var lastEvent;
var heldKeys = {};
window.addEventListener("keydown", function(event) {
  if (event.keyCode == SPACEBAR) {
    moveUp = true;
  }

}, false);

window.addEventListener("keyup", function(event) {
  if (event.keyCode == SPACEBAR) {
    moveUp = false;
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

  pipeOneBot.y = pipeOneTop.y + pipeOneTop.height + 124;
  pipeTwoBot.y = pipeTwoTop.y + pipeTwoTop.height + 124;
  pipeThreeBot.y = pipeThreeTop.y + pipeThreeTop.height + 124;

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

function playGame() {
  //Set the bird's acceleration if the keys are being pressed
  //Up
  if (moveUp) {
    bird.accelerationY = -0.2;
    bird.gravity = 0;
    bird.friction = 1;
    bird.jump = -2.6;
    jumpSound.currentTime = 0;
    jumpSound.play();
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
    if (hitTestCollision(bird, pipeOneTop) || hitTestCollision(bird, pipeOneBot) || hitTestCollision(bird, pipeTwoTop) || hitTestCollision(bird, pipeTwoBot) || hitTestCollision(bird, pipeThreeTop) || hitTestCollision(bird, pipeThreeBot)) {
      console.log("Collision");
      gameState = OVER;
      deadSound.currentTime = 0;
      deadSound.play();
    }
    if (bird.y + bird.height == floor.y || bird.y + bird.height == floorTwo.y) {
      console.log("Hit floor!");
      gameState = OVER;
      deadSound.currentTime = 0;
      deadSound.play();
    }
}

function endGame() {
  gameOver.visible = true;
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