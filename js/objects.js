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

//Object arrays
var sprites = [];

//The canvas
var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

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
pipeOneTop.y = Math.random() + (-260 + 360) - 260;
sprites.push(pipeOneTop);

var pipeOneBot = Object.create(spriteObject);
pipeOneBot.sourceX = 600;
pipeOneBot.sourceY = 439;
pipeOneBot.sourceWidth = 66;
pipeOneBot.sourceHeight = 321;
pipeOneBot.width = 66;
pipeOneBot.height = 321;
pipeOneBot.x = canvas.width;
pipeOneBot.y = pipeOneTop.y + pipeOneTop.height + 124;
sprites.push(pipeOneBot);

var pipeTwoTop = Object.create(spriteObject);
pipeTwoTop.sourceX = 600;
pipeTwoTop.sourceWidth = 66;
pipeTwoTop.sourceHeight = 321;
pipeTwoTop.width = 66;
pipeTwoTop.height = 321;
pipeTwoTop.x = canvas.width + 225;
pipeTwoTop.y = Math.random() + (-260 + 360) - 260;
sprites.push(pipeTwoTop);

var pipeTwoBot = Object.create(spriteObject);
pipeTwoBot.sourceX = 600;
pipeTwoBot.sourceY = 439;
pipeTwoBot.sourceWidth = 66;
pipeTwoBot.sourceHeight = 321;
pipeTwoBot.width = 66;
pipeTwoBot.height = 321;
pipeTwoBot.x = canvas.width + 225;
pipeTwoBot.y = pipeTwoTop.y + pipeTwoTop.height + 124;
sprites.push(pipeTwoBot);

var pipeThreeTop = Object.create(spriteObject);
pipeThreeTop.sourceX = 600;
pipeThreeTop.sourceWidth = 66;
pipeThreeTop.sourceHeight = 321;
pipeThreeTop.width = 66;
pipeThreeTop.height = 321;
pipeThreeTop.x = canvas.width + 450;
pipeThreeTop.y = Math.random() + (-260 + 360) - 260;
sprites.push(pipeThreeTop);

var pipeThreeBot = Object.create(spriteObject);
pipeThreeBot.sourceX = 600;
pipeThreeBot.sourceY = 439;
pipeThreeBot.sourceWidth = 66;
pipeThreeBot.sourceHeight = 321;
pipeThreeBot.width = 66;
pipeThreeBot.height = 321;
pipeThreeBot.x = canvas.width + 450;
pipeThreeBot.y = pipeThreeTop.y + pipeThreeTop.height + 124;
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

// Audio
var deadSound = document.querySelector("#deadSound");
deadSound.load();
// assetsToLoad.push(deadSound);

var jumpSound = document.querySelector("#jumpSound");
jumpSound.load();
// assetsToLoad.push(jumpSound);
