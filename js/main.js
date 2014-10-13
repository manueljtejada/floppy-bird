//--- The sprite object

var spriteObject =
{
  sourceX: 0,
  sourceY: 0,
  sourceWidth: 64,
  sourceHeight: 46,
  width: 64,
  height: 46,
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
  jump: -4.6,
    
  //Platform game properties   
  isOnGround: undefined,

  //Getters
  centerX: function()
  {
    return this.x + (this.width / 2);
  },
  centerY: function()
  {
    return this.y + (this.height / 2);
  },
  halfWidth: function()
  {
    return this.width / 2;
  },
  halfHeight: function()
  {
    return this.height / 2;
  }
};

//Object arrays
var sprites = [];
var assetsToLoad = [];
var assetsLoaded = 0;


var canvas;
var context;
var timer;

var SPACEBAR = 32;
var moveUp = false;

var center = Object();

//The bird
var bird = Object.create(spriteObject);
bird.x = canvas.width / 2 - bird.halfWidth();
bird.y = canvas.height / 2 - bird.halfHeight();
sprites.push(bird);

var floor = Object();
floor.width = 600;
floor.height = 70;
floor.color = "dcd795";
floor.image = null;

var floorTwo = Object();
floorTwo.width = 600;
floorTwo.height = 70;
floorTwo.color = "dcd795";
floorTwo.image = null;

function clearCanvas() {
	// Store the current transformation matrix
	context.save();

	// Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Restore the transform
	context.restore();
}

function fillRect( x, y, width, height ) {
	context.fillRect( x, y, width, height );
}

function handleKeyDown(event) {
	switch(event.keyCode) {
		case SPACEBAR:
			bird.y = bird.y - 25;
			break;
	}
}

update();

function update() {
	//The animation loop
	requestAnimationFrame(update, canvas);

	floor.x -= 2;
	floorTwo.x -= 2;

	if(floor.x < -600) {
		floor.x = 0;
	}

	if(floorTwo.x < 0) {
		floorTwo.x = 600;
	}

}

function draw() {
	// Clear the screen.
	clearCanvas();
	
	// Draw my bird
	context.fillStyle = bird.color;
	context.drawImage( bird.image, bird.x, bird.y );
	context.drawImage( floor.image, floor.x, floor.y );
	context.drawImage( floorTwo.image, floorTwo.x, floorTwo.y );
}

function gameLoop() {
	draw();
}

function onLoad() {
	canvas = document.getElementById("theCanvas");
	context = canvas.getContext("2d");
	
	window.addEventListener("keydown",handleKeyDown,false);
	
	center.x = canvas.width / 2;
	center.y = canvas.height / 2;

	  //Display the sprites
	  if(sprites.length !== 0)
	  {
		  for(var i = 0; i < sprites.length; i++)
		  {
		     var sprite = sprites[i];
		     if(sprite.visible)
		     {
			     context.drawImage
			     (
			       image, 
			       sprite.sourceX, sprite.sourceY, 
			       sprite.sourceWidth, sprite.sourceHeight,
			       Math.floor(sprite.x), Math.floor(sprite.y), 
			       sprite.width, sprite.height
			     ); 
		     }
		  }
	  }

	floor.x = 0;
	floor.y = canvas.height - floor.height;

	floorTwo.x = 600;
	floorTwo.y = floor.y;

	floor.image = new Image();
	floor.image.src = "img/floor.png";

	floorTwo.image = new Image();
	floorTwo.image.src = "img/floor.png";

	timer = setInterval(gameLoop, 30);
	return timer;
}