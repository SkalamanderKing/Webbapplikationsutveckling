/*Fredrick Östlund för kursen YHJUST16 2016*/

//Spelarens inmatning nr 1
var input1;
var input2;
var gissa;
var rand;

//nyGiss kontrollerar spelarens 2 första inmatningar, som blir sann när allt är bra/kontrollerat
var nyGiss=false;
//Så länge denna är sann pågår spelet
var start;

//Poäng räknare
var f =0;
var r=0;
var w1=true;
var w2=true;
var w3=true;

/*"spelloopen", en loop pågår till spelaren avslutar*/
function spelloop() {
	
	//Intro
	start=window.confirm("Välj två siffor mellan 1-100 som du vill spela med.");
	if(!start){location.reload(true); return;}
	
	while(true){
			if(!nyGiss){
				//input är spelarens första siffra, inData är en kontroll-metod
				input1=inData();
				if(input1==null){location.reload(true); return;}
				input2=inData();
				if(input2==null){location.reload(true); return;}
				//Om input1 och 2 är ok skickas de till slumpgenerator
				rand=randomIntFromInterval(input1, input2);
				nyGiss=true;
				}
		//Spelarens gissningar (körs ensamt om nyGiss är true, dvs spelaren kan gissa flera ggr)
		gissa=inData();
		if(gissa==null){location.reload(true); return;}
		
		//rightOrWrong returnerar sant el falsk, sant=nygissning, falsk=helt nytt spel
		nyGiss=rightOrWrong(gissa);
		if(nyGiss==null){location.reload(true); return;}
		}
}

//Tar emot spelarens gissning och jämför med rand och returnerar nyGiss
function rightOrWrong(gissa)
{
	//Spelaren gissade rätt och får frågan om nytt spel
	if (gissa===rand){
					//Nollställa alla variabler
					gissa=null;
					input1=null;
					input2=null;
					rand=null;
					//Poäng
					r=r+1;
					alert("RÄTT! Antal rätt: " +r +" Antal fel: "+ f +" ");
					var tmp=window.confirm("Tryck OK för att spela igen!");
					if(!tmp) {location.reload(true); return;}
				
					return false;
						
			}
			//spelaren gissade fel och uppmans gissa igen (nyGiss fortsätter vara true)
		else{
			//Lägg till fel-poäng
			f=f+1;
			//Presentera fel och statistik
			alert("Fel! Antal fel: " + f + " Antal rätt: "+ r +" \nrand:"+rand);
			alert("Gissa igen!");
		
			return true;
				}	
	
}

//Slumpgenerator som skickar ett slump tal mellan de två tal som spelaren valde
function randomIntFromInterval(input1, input2){
 return Math.floor(Math.random()*(input2-input1+1)+input1);
 
	}
//Tar emot spelarens data och kollar efter diverse fel och returnerar sant/falsk
function check(inp){
if(isNaN(inp) || inp=="" || inp<1 || inp>100)
			return false;
		else return true;
		}
		
	
			//Sköter promptar som spelaren ska mata in data i och returnerar input som en Integer
			function inData(){
				//anv för att ändra texten 
				var svar;
				if(nyGiss) svar="Gissa!";
				else svar="Välj en siffran mellan 1-100, tack!";
				
				var w1=true;
					while(w1)
					{
					//	
					var inp = window.prompt(svar, "");
					if(!inp){location.reload(true); return;}
					//Kolla data som spelaren matade in: om falsk visas en alert och loopen fortsätter
					if(!check(inp)) {
					window.alert("Endast siffror mellan 1 och 100 tack! " + inp);
					w1=true;
					}
					else w1=false;
					}
					
					return Number(inp);
			} 