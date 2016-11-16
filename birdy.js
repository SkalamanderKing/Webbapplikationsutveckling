/* Fredrick Östlund (c) 2016 */

//Global sprites and spritSheets
let backgroundSprite = undefined;
let spriteSheet1 = undefined;
let spriteSheet2= undefined;
let ball=undefined;

var fart=undefined;

//empty graphic zone
let canvas=undefined;

//object of interface 2D rendering contex for canvas to draw within
let c = undefined;

//Composite variabels, objects, for positions the sprites on canvas area
let spritePosition = {x : 0, y : 0};
let spritePosition2 = {x : 200, y : 200};
let spriteSheetPosition = {x : 0, y : 0};
let ballPos={x : 240, y : 200};

//variabe for animation to controll when  total number of frames i higher (the spritesheet is end)
let index=0; 

//variabe for animation, the number of frames within a spritesheet (a single sprite within a spiteSheet)
let numFrames = 12;//30

//variabe for animation, The size of a frame in a spritesheet
let frameSize = {width : 300, height : 300};

function handleKeyDown(evt) {
    Keyboard.keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
}

var Keyboard = { keyDown : -1 };

var Keys = {
    A: 65,     B: 66,      C: 67,      D: 68,       E: 69,      F: 70,
    G: 71,     H: 72,      I: 73,      J: 74,       K: 75,      L: 76,
    M: 77,     N: 78,      O: 79,      P: 80,       Q: 81,      R: 82,
    S: 83,     T: 84,      U: 85,      V: 86,       W: 87,      X: 88,
    Y: 89,     Z: 90
};

//Load stuff
start = function () {
	
fart=0.1;
	canvas = document.getElementById("myCanvas");
	c = canvas.getContext("2d");
	
    	backgroundSprite = new Image();
    	backgroundSprite.src = "game_bg.png";
	spriteSheet1 = new Image();
	spriteSheet1.src = "birdSurvive2.png";
	spriteSheet2 = new Image();
	spriteSheet2.src = "birdyTalk2.png";
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
	window.setTimeout(mainLoop, 1000 / 10); //60
};



//Used for updating the gameword
update = function () {
knapp();
	var d = new Date();
	ballPos.x = d.getTime() * fart % canvas.width;

};


knapp = function () {
    if (Keyboard.keyDown === Keys.R)
		//fart=fart+0.1;
	spritePosition2 = {x : -100, y : -10};
        //ballPos={x : 20, y : 20};
 else if (Keyboard.keyDown === Keys.E)
ballPos={x : 200, y : 240};
	
};

//Calls the appropriate drawfunction: either a animated sprite or not
draw = function () {
	drawImage(backgroundSprite, { x : 0, y : 0 });

	anim(spriteSheet1, { x : 0, y : 0 });
	anim(spriteSheet2, spritePosition2);

	drawImage(ball, ballPos);
	drawImage(ball, { x : 80, y : 50 });
	//drawImage(Game.balloonSprite2, Game.balloonPosition2);
};

//animates a spriteSheet
anim = function(spriteSheet, position) {
	//knapp();
	c.save();
	c.translate(position.x, position.y);

	//a slightly diffrent use of this method tha above, only a frame on the spritesheet is drawned, not the entire image obj
	c.drawImage(spriteSheet, spriteSheetPosition.x, spriteSheetPosition.y, frameSize.width, frameSize.height, 0, 0, frameSize.width, frameSize.height);
	
	
	//each time around the frame size is added to our spriteSheetPosition.x, moving along the source spritesheet (an image-object)
	spriteSheetPosition.x += frameSize.width;
	
	//increase the index, to know which frame the animations currently are on
	index += 1;
			
	//if the index is higher than the total number of frames, it's on the end and all has to start over
	if (index >= numFrames) {
	spriteSheetPosition.x =0;
	spriteSheetPosition.y =0;
	index=0;	
				}
	//if the loop has gotten to the limit of the source sprite's width, it has to move down one row of frames
	else if (spriteSheetPosition.x + frameSize.width > spriteSheet.width){
	spriteSheetPosition.x =0;
	spriteSheetPosition.y += frameSize.width;
				}
	c.restore();
};    	
	
   		

