/* Fredrick Östlund (c) 2016 */

//"use strict";

//Global sprites and spritSheets
let backgroundSprite = undefined;
let spriteSheet = undefined;
let ball=undefined;

var speedOfBallon=undefined;

//empty graphic zone
let canvas=undefined;

//object of interface 2D rendering contex for canvas to draw within
let c = undefined;


//let spritePosition = {x : 0, y : 0};

//Composite variabel (objects) for positions the sprites on canvas area
let spriteSheetPosition = undefined; //{x : 0, y : 0};

//Ball
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
const ANI_BIRDY_DEAD=3600;
const ANI_PLAYER_SHOT=4500;
const ANI_IN_WAIT=5400;
const ANI_PLAYER_SURVIVED=6300;
const ANI_PLAYER_DEAD=7200;
const ANI_GAME_OVER=8100;

let gameOver=false;
let birdyIsAlive=false;

let mouseTrue=true;


//var randomNumber = Math.floor((Math.random() * 6) + 1);
var randomNumber=5;
var death=6;

//if Player has started the game this one becomes true
var gameState=false;

let playersTurn=false;

// var no1_Ani_initial_pos_set=false;
// var no2_Ani_initial_pos_set=false;
// var no3_Ani_initial_pos_set=false;

var tid=undefined;

var enterDisabled=true;

var animation1=true;
var animation2=false;
var animation3=false;
var animation4=false;
var animation5=false;
var animation6=false;
var animation7=false;
var animation8=false;
var animation9=false;
var animation10=false;


var state1_start=true;
var state2_talk=false;
var state3_birdy_shot=false;

function handleKeyDown(evt) {
    Keyboard.keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
}

var Keyboard = { keyDown : -1 };

var Keys = {ENTER: 13,};

var Mouse = {
	position: {x:0, y:0},
	leftDown: false
};
function handleMouseDown(evt){
	if(evt.which===1)
		Mouse.leftDown=true;
};
function handleMouseUp(evt){
	if(evt.which===1)
		Mouse.leftDown=false;
};





//Load stuff
start = function () {
	

	canvas = document.getElementById("myCanvas");
	c = canvas.getContext("2d");
	
	myButt.disabled = false;
		enterDisabled=false;
	
	spriteSheetPosition = {x : 0, y : 0};
	
    	//backgroundSprite = new Image();
    	//backgroundSprite.src = "game_bg.png";
		
		 	spriteSheet = new Image();
	spriteSheet.src = "img/big3.gif";

	ball = new Image();
	ball.src = "spr_balloon.png";

	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	document.onmousedown = handleMouseDown;
	document.onmouseup = handleMouseUp;
speedOfBallon=0.1;
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

playerAction = function () {
	if(!enterDisabled){
		if(Keyboard.keyDown === Keys.ENTER)
		{
			myButt.disabled = true;
			gameState = true;
			animation2=true;
			enterDisabled=true;
			animation1=false;
		}
	}
};

//The game engine main loop
mainLoop = function() {
	clearCanvas();
	playerAction();
	update();
	draw();
	window.setTimeout(mainLoop, 1000 / 6); //60
};
	clicked = function ()
		{
			document.getElementById("myButt").style.visibility = "hidden";
			if(playersTurn)
			{
				if(randomNumber===death){
					animation9=true; 
					playersTurn=false;
					myButt.disabled = true;
					enterDisabled=true;
					}
					else {
						animation8=true; 
						playersTurn=false;
						myButt.disabled = true;
						enterDisabled=true;
					}
			}
			else if(gameOver){location.reload(true);}
		else{
		
			animation1=false;
			myButt.disabled = true;
			enterDisabled=true;
			gameState = true;
			animation2=true;
			}
			
		}
		
//Used for updating the gameword
update = function () {
		
	if(gameState)
	{
		//talk
		if(animation2)
		{
		//Start the animation from the begining on the part this part of the spritsheet
		index =0;
		
		//prevent animation from frezee
		animation2=false;
		
		//move to position on spritsheet
		posOnSpriteSheet= 900;
		
		//set x to 0, the first frame of part of spritesheet
		spriteSheetPosition.x=0;
		
		//set y position to start frame
		spriteSheetPosition.y=900;
		//enterDisabled=true;
		
		//play the animation for 2 seconds before change
		tid= setTimeout(function(){animation3=true; }, 2000);
	//	clearTimeout(tid);
		}
		//birdys pre-shot screen
		else if (animation3)
		{
				index =0;
			//clearTimeout(tid);
			animation3=false;
			posOnSpriteSheet= 1800;
			spriteSheetPosition.y=1800;
			spriteSheetPosition.x=0;
			
			tid= setTimeout(function(){if(randomNumber!=death){animation4=true;} else {animation5=true; }}, 2000);
	
		}
				//alive
		else if (animation4)
		{
				index =0;
			//clearTimeout(tid);
			index =0;
			animation4=false;
			posOnSpriteSheet= 2700; //2700
			spriteSheetPosition.y=2700;
			spriteSheetPosition.x=0;
			randomNumber=randomNumber+1;
	
			tid= setTimeout(function(){animation6=true}, 2000);
		}
	
		//death of Birdy
		else if (animation5)
		{
			//Start the animation from the begining on the part this part of the spritsheet
			index =0;
			spriteSheetPosition.x=0;
			spriteSheetPosition.y=3600;//part of spritesheet
			posOnSpriteSheet= 3600;
			animation5=false;
			tid= setTimeout(function(){animation10=true;}, 2000);
		
		}
			//players turn
			else if (animation6)
		{
			index =0;
			spriteSheetPosition.x=0;
			spriteSheetPosition.y=4500;//
			posOnSpriteSheet= 4500;
			animation6=false;
		tid= setTimeout(function(){animation7=true;}, 2000);
		}
				
				//player idle
				else if (animation7)
		{
			index =0;
			spriteSheetPosition.x=0;
			spriteSheetPosition.y=5400;//
			posOnSpriteSheet= 5400;
			animation7=false;
			myButt.disabled = false;
			enterDisabled=false;
			playersTurn=true;
			document.getElementById("myButt").style.visibility = "visible";
			document.getElementById("myButt").style.background='red';
			document.getElementById("myButt").innerHTML="FIRE!";
		}
			//player survived
			else if (animation8)
		{
			index =0;
			spriteSheetPosition.x=0;
			spriteSheetPosition.y=6300;//
			posOnSpriteSheet= 6300;
			animation8=false;
			randomNumber=randomNumber+1;
			tid= setTimeout(function(){animation3=true;}, 2000);
		}
	
				else if (animation9)
		{
			index =0;
			spriteSheetPosition.x=0;
			spriteSheetPosition.y=7500;//
			posOnSpriteSheet= 7500;
			animation9=false;
			document.body.style.backgroundColor = "black"; 
			tid= setTimeout(function(){animation10=true;}, 2000);
		}
	
				//game over
				else if (animation10)
		{
				index =0;
			//clearTimeout(tid);
			//animation10=false; //?
			posOnSpriteSheet= 8400;
			spriteSheetPosition.y=8400;
			spriteSheetPosition.x=0;
			
		document.body.style.backgroundColor = "red"; 
	
	
			tid= setTimeout(function(){enterDisabled=false; myButt.disabled = false; gameOver=true;
			document.getElementById("myButt").style.visibility = "visible";
			document.getElementById("myButt").innerHTML="New Game?";
			document.getElementById("myButt").style.background='blue';
			}, 2000);
		}
	}
		
	// playerAction();
	// if(state1_start)
	// {
		// posOnSpriteSheet= 0;
	// }
	// else if(gameState)
	// {
		// frameSize.y =1800;
		 // posOnSpriteSheet= 900;
	
			// if(t)
			// {
			// spriteSheetPosition.x=0; t=false;
			// }
			
		// if(state2_talk)
		// {
		// posOnSpriteSheet= 900;
		// state2_talk=false;
		
		// if(spriteSheetPosition.x===900)
		// state3_birdy_shot=true;
		// }
		
		// if(state3_birdy_shot)
		// {
		// posOnSpriteSheet= 1800;
		// }
		//else if(state2_talk && spriteSheetPosition.x>=900)
		//
	//}
	// if(spriteSheetPosition.y <=600)
		
	// else if(spriteSheetPosition.y >=900 || spriteSheetPosition.y <=1500)
	// posOnSpriteSheet= 900;
	
/* 	
	if(spriteSheetPosition.y===(ANI_BIRDYS_SHOT-frameSize.width) && spriteSheetPosition.x===900)
	{
		posOnSpriteSheet= ANI_BIRDYS_SHOT;
		 mouseTrue=false;
	} */

		
			
	//	var d = new Date();
	//ballPos.x = d.getTime() * speedOfBallon % canvas.width;
};




//Calls the appropriate drawfunction: either a animated sprite or not
draw = function () {
//	drawImage(backgroundSprite, { x : 0, y : 0 });
	anim(spriteSheet, { x : 0, y : 0 });
	//drawImage(ball, ballPos);
	//drawImage(ball, { x : 80, y : 50 });
	
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
	
   		

