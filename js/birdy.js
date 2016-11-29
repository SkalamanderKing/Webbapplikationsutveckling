/* Fredrick Östlund (c) 2016 */

//"use strict";

//Global sprites and spritSheets
let backgroundSprite = undefined;
let spriteSheet = undefined;

//empty graphic zone
let canvas=undefined;

//object of interface 2D rendering contex for canvas to draw within
let c = undefined;

//Composite variabel (objects) for positions the sprites on canvas area (increment value on spritesheet)
let spriteSheetPosition = undefined; //{x : 0, y : 0};

//this value use the spriteSheetPosition.y's first value on a new animation. Necessary since the y pos is changning in the anim-function
let posOnSpriteSheet=0;

//variabe for animation to controll when  total number of frames i higher (the spritesheet is end)
let index=0; 

//variabe for animation, the number of frames within a spritesheet (a single sprite within a spiteSheet)
let numFrames = 12;//30

//variabe for animation, The size of a frame in a spritesheet
let frameSize = {width : 300, height : 300};

//pic out a random number between 1-6, when the number is/reach 6 the bullet is in the chamber and it's game over
var randomNumber = Math.floor((Math.random() * 6) + 1);
//var randomNumber=5;

//This constant works with the randomNumber: if they are equal it's game over regardless if its the player or the NPC turn
const DEATH_NUMBER_NUMBER=6;

//if Player has started the game this one becomes true and trigger a new animation and game event
var gameState=false;

//When this become true some diffrent events starts
let playersTurn=false;

//used to controll the time a animation is showed
var tid=undefined;

//This state is used when it's game over and the game (the site) has to be reloaded
let state0_gameOver=false;
var state1_intro=false;
var state2_BirdysTurnScreen=false;
var state3_BirdySurvived=false;
var state4_BirdyDies=false;
var state5_PlayerTurnScreen=false;
var state6_PlayerIdle=false;
var state7_PlayerSurvived=false;
var state8_PlayerDied=false;
var state9_GameOverScreen=false;

var stop=false;
//Load stuff
start = function () {
	
	canvas = document.getElementById("myCanvas");
	c = canvas.getContext("2d");
	myButt.disabled = false;
	spriteSheetPosition = {x : 0, y : 0};
	spriteSheet = new Image();
	spriteSheet.src = "img/big3.gif";
	
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
	
	clicked = function ()
		{
			//hide the button, 
			document.getElementById("myButt").style.visibility = "hidden";
			if(playersTurn)
			{
				if(randomNumber===DEATH_NUMBER_NUMBER){
					state8_PlayerDied=true; 
					playersTurn=false;
					myButt.disabled = true;
					
					}
					else {
						state7_PlayerSurvived=true; 
						playersTurn=false;
						myButt.disabled = true;
					}
			}
			else if(state0_gameOver){
				location.reload(true);
				}
		else{
		
			//animation1=false;
			myButt.disabled = true;
			//gameState = true;
			state1_intro=true;
			update();
			}
			
		}
		
		
changeState = function(state){
	
	//Sets the current state to false to prevent the animation to frezee
	var state=false;
	
	//Start the animation from the begining on the part this part of the spritsheet
	index=0;
	
	//set x to 0, the first frame of all parts of the animation sequences
	spriteSheetPosition.x=0;
	
	return state;
}
		
//Used for updating the gameword
update = function () {
		
	// if(gameState)
	// {
		//Birdy talk-animation
		if(state1_intro)
		{
		
		//Send the current state to this function, which returns false
		state1_intro=changeState(state1_intro);
		
		
		//move to position on spritsheet, the start of the y position of a new animation sequence
		posOnSpriteSheet= 900;
		
		//set y position to start frame
		spriteSheetPosition.y=900;
		
	
		
		//play the animation for 2 seconds before change
		tid= setTimeout(function(){state2_BirdysTurnScreen=true; }, 2000);

		}
		
		//Birdys pre-shot screen
		else if (state2_BirdysTurnScreen)
		{
			
			state2_BirdysTurnScreen=changeState(state2_BirdysTurnScreen);
			
			
			posOnSpriteSheet= 1800;
			spriteSheetPosition.y=1800;
			
			
			tid= setTimeout(function(){if(randomNumber!=DEATH_NUMBER_NUMBER)
			{state3_BirdySurvived=true;} else {state4_BirdyDies=true; }}, 2000);
	
		}
		
		//Birdy survived
		else if (state3_BirdySurvived)
		{
		
			state3_BirdySurvived=changeState(state3_BirdySurvived);
			posOnSpriteSheet= 2700;
			spriteSheetPosition.y=2700;
	
			randomNumber=randomNumber+1;
			tid= setTimeout(function(){state5_PlayerTurnScreen=true}, 2000);
		}
	
		//Birdy dies
		else if (state4_BirdyDies)
		{
			
			state4_BirdyDies=changeState(state4_BirdyDies);
			
			spriteSheetPosition.y=3600;//part of spritesheet
			posOnSpriteSheet= 3600;
			
			tid= setTimeout(function(){state9_GameOverScreen=true;}, 2000);
		
		}
		//Players pre-shot screen
			else if (state5_PlayerTurnScreen)
		{
			state5_PlayerTurnScreen=changeState(state5_PlayerTurnScreen);
			
			spriteSheetPosition.y=4500;
			posOnSpriteSheet= 4500;
			
			tid= setTimeout(function(){state6_PlayerIdle=true;}, 2000);
		}
				
		//Player trun, idle animation
				else if (state6_PlayerIdle)
		{
			state6_PlayerIdle=changeState(state6_PlayerIdle);
			spriteSheetPosition.y=5400;
			posOnSpriteSheet= 5400;
		
			myButt.disabled = false;
			playersTurn=true;
			
			//Som changes on the DOM 
			document.getElementById("myButt").style.visibility = "visible";
			document.getElementById("myButt").style.background='red';
			document.getElementById("myButt").innerHTML="FIRE!";
		}
			//Player survived
			else if (state7_PlayerSurvived)
		{
			state7_PlayerSurvived=changeState(state7_PlayerSurvived);
			spriteSheetPosition.y=6300;
			posOnSpriteSheet= 6300;
			
			randomNumber=randomNumber+1;
			tid= setTimeout(function(){state2_BirdysTurnScreen=true;}, 2000);
		}
	
			//Player died
			else if (state8_PlayerDied)
		{
			state8_PlayerDied=changeState(state8_PlayerDied);
			spriteSheetPosition.y=7200;//
			posOnSpriteSheet= 7200;
			
			document.body.style.backgroundColor = "black"; 
			tid= setTimeout(function(){state9_GameOverScreen=true;}, 2000);
		}
	
			//Game over screen, same for NPC and the Player
			else if (state9_GameOverScreen)
		{
			
			state9_GameOverScreen=changeState(state9_GameOverScreen);
			document.body.style.backgroundColor = "red"; 

			posOnSpriteSheet= 8100;
			spriteSheetPosition.y=8100;
			
			
			tid= setTimeout(function(){ myButt.disabled = false; state0_gameOver=true;
			document.getElementById("myButt").style.visibility = "visible";
			document.getElementById("myButt").innerHTML="Restart";
			document.getElementById("myButt").style.background='blue';
			stop=true;
			}, 2000);
		}
	//}
		
};


//Calls the appropriate drawfunction: either a animated sprite or not
draw = function () {
	//This is used when a animation dosen't have to be animated on a spitesheet
	//drawImage(backgroundSprite, { x : 0, y : 0 });
	
	//This is used when a animation has to be animated on a spritsheets. In this case the animation is stationary
	anim(spriteSheet, { x : 0, y : 0 });
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
	
   		

