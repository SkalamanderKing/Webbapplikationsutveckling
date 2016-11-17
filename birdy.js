/* Fredrick Östlund (c) 2016 */

//Global sprites and spritSheets
let backgroundSprite = undefined;
let spriteSheet = undefined;
let ball=undefined;

var speedOfBallon=undefined;

//empty graphic zone
let canvas=undefined;

//object of interface 2D rendering contex for canvas to draw within
let c = undefined;

//Composite variabels, objects, for positions the sprites on canvas area
let spritePosition = {x : 0, y : 0};
let spriteSheetPosition = {x : 0, y : 0};
let ballPos={x : 240, y : 200};

let posOnSpriteSheet=0;

var t=true;
var q=true;
//variabe for animation to controll when  total number of frames i higher (the spritesheet is end)
let index=0; 

//variabe for animation, the number of frames within a spritesheet (a single sprite within a spiteSheet)
let numFrames = 12;//30

//variabe for animation, The size of a frame in a spritesheet
let frameSize = {width : 300, height : 300};

const ANI_START_MENU=0;
const ANI_BIRDY_TALK=900;
const ANI_BIRDYS_SHOT=1800;
const ANI_BIRDY_ALIVE=2700;

function handleKeyDown(evt) {
    Keyboard.keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
}

var Keyboard = { keyDown : -1 };

var Keys = {ENTER: 13,};

//Load stuff
start = function () {
	
speedOfBallon=0.1;
	canvas = document.getElementById("myCanvas");
	c = canvas.getContext("2d");
	
    	backgroundSprite = new Image();
    	backgroundSprite.src = "game_bg.png";
		
		 	spriteSheet = new Image();
	spriteSheet.src = "birdy_4.png";

	ball = new Image();
	ball.src = "spr_balloon.png";

	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp; 

	//load in a timespan
	window.setTimeout(mainLoop, 500);
};

//dynamically execute the start function when browser has finished loading	
document.addEventListener('DOMContentLoaded', start);

//A function to clear the canvas 
clearCanvas = function () {
	c.clearRect(0, 0, canvas.width, canvas.height);
};

//a drawing state to make more complicated transformations with sprites, start up by calling save(), restore() removes the state
drawImage = function (sprite, position) {
	c.save();
	c.translate(position.x, position.y);
	
	//this method is a part of context object and is uses to draw stuff on the canvas at diffrent position etc
	c.drawImage(sprite, 0, 0, sprite.width, sprite.height,
        0, 0, sprite.width, sprite.height);
	c.restore();
};

//The game engine main loop
mainLoop = function() {
	clearCanvas();
	update();
	draw();
	window.setTimeout(mainLoop, 1000 / 6); //60
};

//Used for updating the gameword
update = function () {
	knapp();
	var d = new Date();
	ballPos.x = d.getTime() * speedOfBallon % canvas.width;
	
	//if(t)
	if(spriteSheetPosition.y>=1500)
	{
		posOnSpriteSheet= ANI_BIRDYS_SHOT;
	
		//spriteSheetPosition.y =900;
		//t=false;
	}
	//if(q)
	if(spriteSheetPosition.y>=2400)
	{
		posOnSpriteSheet= ANI_BIRDY_ALIVE;
		
		//spriteSheetPosition.y =1800;
		//q=false;
	}
};


knapp = function () {

	
   if (Keyboard.keyDown === Keys.ENTER)
	{
	posOnSpriteSheet=ANI_BIRDY_TALK;
	spriteSheetPosition.y =900;
	spriteSheetPosition.x=0;
	}

/*   else if (Keyboard.keyDown === Keys.E)
 {
	posOnSpriteSheet=0;
	spriteSheetPosition.x =0;
	spriteSheetPosition.y =0;
} 
  else if (Keyboard.keyDown === Keys.W)
 {
	posOnSpriteSheet=1800;
	spriteSheetPosition.x =0;
	spriteSheetPosition.y =1800;
}  */

};

//Calls the appropriate drawfunction: either a animated sprite or not
draw = function () {
	drawImage(backgroundSprite, { x : 0, y : 0 });
	anim(spriteSheet, { x : 0, y : 0 });
	drawImage(ball, ballPos);
	drawImage(ball, { x : 80, y : 50 });
	
};

//animates a spriteSheet
anim = function(spriteSheet, position) {

	c.save();
	c.translate(position.x, position.y);

	//a slightly diffrent use of this method tha above, only a frame on the spritesheet is drawned, not the entire image obj
	c.drawImage(spriteSheet, spriteSheetPosition.x, spriteSheetPosition.y, frameSize.width, frameSize.height, 0, 0, frameSize.width, frameSize.height);
	
	
	//each time around the frame size is added to spriteSheetPosition.x, moving along the source spritesheet (an image-object)
	spriteSheetPosition.x += frameSize.width; //900 1:a varv
	
	//increase the index, to know which frame the animations currently are on
	index += 1; //4, 8, 12
			
	//if the index is higher than the total number of frames (in this case 12), it's on the end and all has to start over 
	if (index >= numFrames) {
	spriteSheetPosition.x =0;
	index=0;
	spriteSheetPosition.y =posOnSpriteSheet; //posOnSpritesheet controlls the next animations
		
				}
	//if the loop has gotten to the limit of the source sprite's width, it has to move down one row of frames
	else if (spriteSheetPosition.x + frameSize.width > spriteSheet.width){ 
	spriteSheetPosition.x =0;
	spriteSheetPosition.y += frameSize.width;
				}
	c.restore();
};    	
	
   		

