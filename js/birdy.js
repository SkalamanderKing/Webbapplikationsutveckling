/* Fredrick Östlund (c) 2016 */

"use strict";

//The Spritsheet, one big image
let spriteSheet = undefined;

//empty graphic zone
let canvas = undefined;

//object of interface 2D rendering contex for canvas to draw within
let c = undefined;

//Composite variabel (objects) for positions the sprites on canvas area (increment value on spritesheet)
let spriteSheetPosition = {x : 0, y : 0};

//this value use the spriteSheetPosition.y's first value on a new animation. Necessary since the y pos is changning in the anim-function
let posOnSpriteSheet=0;

//variabe for animation to controll when  total number of frames i higher (the spritesheet is end)
let index=0;

//variabe for animation, the number of frames within a spritesheet (a single sprite within a spiteSheet)
let numFrames = 12;

//variabe for animation, The size of a frame in a spritesheet px
let frameSize = {width : 300, height : 300};

//pic out a random number between 1-6, when the number is/reach 6 the bullet is in the chamber and it's game over
var randomNumber = Math.floor((Math.random() * 6) + 1);
//var randomNumber=5;

//This constant works with the randomNumber: if they are equal it's game over regardless if its the player or the NPC turn
const DEATH_NUMBER_NUMBER=6;

//This one is needed to decide what diffrent if-statments when the of button is triggered
let playersTurn=false;

//used to controll the time a animation is showed
var tid=undefined;

//If this becomes true the player has the opportunity to restart a ended game
let gameOver=false;

/*Diffrent game states when the game is on: used to change animations and game play etc*/
let stateOfGame = {
intro : {visible: false, startPos: 900},
birdysTurnScreen : {visible: false, startPos: 1800},
birdySurvived : {visible: false, startPos: 2700},
birdyDies : {visible: false, startPos: 3600},
playerTurnScreen : {visible: false, startPos: 4500},
playerIdle: {visible: false, startPos: 5400},
playerSurvived : {visible: false, startPos: 6300},
playerDied : {visible: false, startPos: 7200},
gameOverScreen : {visible: false, startPos: 8100}
};

//Sound effecet
var shot=undefined;

/*Load stuff as soon as the html site opens*/
let start = function () {
	//The area that the game is animated on
	canvas = document.getElementById("myCanvas");
	c = canvas.getContext("2d");
	spriteSheet = new Image();
	spriteSheet.src = "img/big3.gif";
	shot= new Audio();
	shot.src = "gunshoot1.wav";
	
	//load in a timespan
	window.setTimeout(mainLoop, 500);
};

/*dynamically execute the start function when browser has finished loading*/
document.addEventListener('DOMContentLoaded', start);

/*A function to clear the canvas*/
let clearCanvas = function () {
	c.clearRect(0, 0, canvas.width, canvas.height);
};

/*a drawing state to make more complicated transformations with sprites, start up by calling save(), restore() removes the state*/
/* let drawImage = function (sprite, position) {
	c.save();
	c.translate(position.x, position.y);
	
	//this method is a part of context object and is uses to draw stuff on the canvas at diffrent position etc
	c.drawImage(sprite, 0, 0, sprite.width, sprite.height,
        0, 0, sprite.width, sprite.height);
	c.restore();
}; */

/*The game engine main loop*/
let mainLoop = function() {
	clearCanvas();
	update();
	draw();
	window.setTimeout(mainLoop, 1000 / 6); //60
};
	
/* Button function. When the Player push the button diffrent thing can happen*/
let clicked = function (){
			
			//hide the button, this is so the Player wont gett distracted
			document.getElementById("myButt").style.visibility = "hidden";
			
			//The Players turn to trigger the gun
			if(playersTurn)
			{
				//If the two number randomNumber and DEATH_NUMBER_NUMBER is equal, the Player is dead and it's Gameover
				if(randomNumber===DEATH_NUMBER_NUMBER){
					stateOfGame.playerDied.visible=true; 
					playersTurn=false;
					myButt.disabled = true;
					}
					
					//The Player survived and teh Game is on
					else {
						stateOfGame.playerSurvived.visible=true; 
						playersTurn=false;
						myButt.disabled = true;
					}
			}
			//If is already Game Over and the Player wants to start over, this one reload the program
			else if(gameOver){
				location.reload(true);
				}
				
		//Starts the game (default statet), if the button is pressed the game starts		
		else{
			myButt.disabled = true;
			stateOfGame.intro.visible=true;
			update();
			}
		}
	
/*sound*/	
var soundEffect = function(){
	shot.play();
};		

/*This function sets some variabes when called upon, which mosley have to do whith the animations*/
let changeState = function(state){
	
	//Start the animation from the begining on the part this part of the spritsheet
	index=0;
	
	//set x to 0, the first frame of all parts of the animation sequences
	spriteSheetPosition.x=0;
	changeYpos(state);
	
	//Prevent the animation to freze
	return false;
}

/*A long function that changes the y-position on the spritSheet*/
let changeYpos = function(state){
		if(stateOfGame.intro.visible){
			//move to position on spritsheet, the start of the y position of a new animation sequence
			posOnSpriteSheet= stateOfGame.intro.startPos;
		
			//set y position to start frame
			spriteSheetPosition.y=stateOfGame.intro.startPos;
		}
		else if (stateOfGame.birdysTurnScreen.visible)
		{
			posOnSpriteSheet= stateOfGame.birdysTurnScreen.startPos;
			spriteSheetPosition.y=stateOfGame.birdysTurnScreen.startPos;
		}
		else if (stateOfGame.birdySurvived.visible)
		{
			posOnSpriteSheet= stateOfGame.birdySurvived.startPos;
			spriteSheetPosition.y=stateOfGame.birdySurvived.startPos;
		}
		else if (stateOfGame.birdyDies.visible)
		{
		spriteSheetPosition.y=stateOfGame.birdyDies.startPos;
			posOnSpriteSheet= stateOfGame.birdyDies.startPos;
		}
		else if (stateOfGame.playerTurnScreen.visible)
		{
			spriteSheetPosition.y=stateOfGame.playerTurnScreen.startPos;
			posOnSpriteSheet= stateOfGame.playerTurnScreen.startPos;
		}
		else if (stateOfGame.playerIdle.visible)
		{
			spriteSheetPosition.y=stateOfGame.playerIdle.startPos;
			posOnSpriteSheet= stateOfGame.playerIdle.startPos;
		}
		else if (stateOfGame.playerSurvived.visible)
		{
			spriteSheetPosition.y=stateOfGame.playerSurvived.startPos;
			posOnSpriteSheet= stateOfGame.playerSurvived.startPos;
		}
		else if (stateOfGame.playerDied.visible)
		{
			spriteSheetPosition.y=stateOfGame.playerDied.startPos;
			posOnSpriteSheet= stateOfGame.playerDied.startPos;
		}
		else if (stateOfGame.gameOverScreen.visible)
		{
			posOnSpriteSheet= stateOfGame.gameOverScreen.startPos;
			spriteSheetPosition.y=stateOfGame.gameOverScreen.startPos;
		}
	
}
/* Used for updating the gameword, here is the main part of "russian roulette engine" */
let update = function () {
		
		//Birdy talk-animation
		if(stateOfGame.intro.visible)
		{
			//Send the current state to this function, which returns false
			stateOfGame.intro.visible=changeState(stateOfGame.intro.visible);
		
			//play the animation for 2 seconds before change to the next state
			tid= setTimeout(function(){stateOfGame.birdysTurnScreen.visible=true; }, 2000);
		}
		
		//Birdys pre-shot screen
		else if (stateOfGame.birdysTurnScreen.visible)
		{
			stateOfGame.birdysTurnScreen.visible=changeState(stateOfGame.birdysTurnScreen.visible);
		
			//in this timer a if-statment decied if NPC wins or lose by checking the random number whith the constant
			tid= setTimeout(function(){if(randomNumber!=DEATH_NUMBER_NUMBER)
			{stateOfGame.birdySurvived.visible=true;} else {stateOfGame.birdyDies.visible=true; }}, 2000);
	
		}
		//Birdy survived
		else if (stateOfGame.birdySurvived.visible)
		{
		stateOfGame.birdySurvived.visible=changeState(stateOfGame.birdySurvived.visible);
	
			//The random number increase. Eventually randomNumber and DEATH_NUMBER_NUMBER is the same.
			randomNumber=randomNumber+1;
			tid= setTimeout(function(){stateOfGame.playerTurnScreen.visible=true}, 2000);
		}
		//Birdy loses
		else if (stateOfGame.birdyDies.visible)
		{
			stateOfGame.birdyDies.visible=changeState(stateOfGame.birdyDies.visible);
			tid= setTimeout(function(){ soundEffect();}, 1300);

			//jump to gameover screen
			tid= setTimeout(function(){stateOfGame.gameOverScreen.visible=true;}, 2000);
		}
		//Players pre-shot screen
			else if (stateOfGame.playerTurnScreen.visible)
		{
			stateOfGame.playerTurnScreen.visible=changeState(stateOfGame.playerTurnScreen.visible);
			tid= setTimeout(function(){stateOfGame.playerIdle.visible=true;}, 2000);
		}	
		   //Player turn, idle animation until player "push the trigger"
			else if (stateOfGame.playerIdle.visible)
		{
			stateOfGame.playerIdle.visible=changeState(stateOfGame.playerIdle.visible);
	
			//Now can the user push the button
			myButt.disabled = false;
			
			//This one is needed to decid what the effecets of the button will have
			playersTurn=true;
			
			//Som changes on the DOM 
			document.getElementById("myButt").style.visibility = "visible";
			document.getElementById("myButt").style.background='red';
			document.getElementById("myButt").innerHTML="FIRE!";
		}
			//Player survived
			else if (stateOfGame.playerSurvived.visible)
		{
			stateOfGame.playerSurvived.visible=changeState(stateOfGame.playerSurvived.visible);

			//again must "the bullet rotatet one click in the chamber"
			randomNumber=randomNumber+1;
			tid= setTimeout(function(){stateOfGame.birdysTurnScreen.visible=true;}, 2000);
		}
			//Player died
			else if (stateOfGame.playerDied.visible)
		{
			shot.play();
			stateOfGame.playerDied.visible=changeState(stateOfGame.playerDied.visible);
			document.body.style.backgroundColor = "black"; 
			tid= setTimeout(function(){stateOfGame.gameOverScreen.visible=true;}, 2000);
		}
	
			//Game over screen, same for NPC and the Player
			else if (stateOfGame.gameOverScreen.visible)
		{
			stateOfGame.gameOverScreen.visible=changeState(stateOfGame.gameOverScreen.visible);
			document.body.style.backgroundColor = "red"; 
			
			//Reset the button when 2 sec has passed and some DOM event 
			tid= setTimeout(function(){ myButt.disabled = false; gameOver=true;
			document.getElementById("myButt").style.visibility = "visible";
			document.getElementById("myButt").innerHTML="Restart";
			document.getElementById("myButt").style.background='blue';
			stop=true;
			}, 2000);
		}
		
};

/*Calls the appropriate drawfunction: either a animated sprite or not*/
let draw = function () {
	//This is used when a animation dosen't have to be animated on a spitesheet
	//drawImage(backgroundSprite, { x : 0, y : 0 });
	
	//This is used when a animation has to be animated on a spritsheets. In this case the animation is stationary
	anim(spriteSheet, { x : 0, y : 0 });
};

/* Animates a spriteSheet*/
let anim = function(spriteSheet, position) {

	c.save();
	c.translate(position.x, position.y);
	
	//a slightly diffrent use of this method tha above, only a frame on the spritesheet is drawned, not the entire image obj
	c.drawImage(spriteSheet, spriteSheetPosition.x, spriteSheetPosition.y, frameSize.width, frameSize.height, 0, 0, frameSize.width, frameSize.height);
	
	//each time around the frame size is added to spriteSheetPosition.x, moving along the source spritesheet (an image-object)
	spriteSheetPosition.x += frameSize.width;
	
	//increase the index, to know which frame the animations currently are on
	index += 1;
			
	//if the index is higher than the total number of frames (in this case 12), it's on the end and all has to start over 
	if (index >= numFrames) {
	spriteSheetPosition.x =0;
	index=0;
	spriteSheetPosition.y = posOnSpriteSheet;
		
				}
	//if the loop has gotten to the limit of the source sprite's width, it has to move down one row of frames
	else if (spriteSheetPosition.x + frameSize.width > spriteSheet.width){ 
	spriteSheetPosition.x =0;
	spriteSheetPosition.y += frameSize.height;
	c.restore();
				}
};    	
	
   		

