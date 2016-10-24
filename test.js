/*Fredrick Östlund för kursen YHJUST16 2016*/

//Spelarens inmatning nr 1
var input1;
var input2;
var gissa;
var rand;

//Blir sann om spelaren spelat 1 ggr
var nyttSpel=false;

//Så länge denna är sann pågår spelet
var start=true;

//Poäng räknare
var f =0;
var r=0;

/*"spelloopen", en loop pågår till spelaren avslutar*/
function spelloop() {
	
	//1:a pop-up
	start=window.confirm("Välj två siffor mellan 1-100 som du vill spela med.");
	
	//om spelaren trycker Cancel körs Sluta-funktionen
	if(start==false){sluta();}
	
	//Denna funktion kollar diverse felinmatningar av spelaren
	 kontroll();
	 
			while(start){
				
				//konverta string till nummer
				input1=Number(input1);
				input2=Number(input2);
				gissa=Number(gissa);
	
				if(start==false){sluta();}
				
				//Vid nästa rundas spel körs inte denna slump
				if(!nyttSpel)
				rand=randomIntFromInterval(input1, input2);
	
			//spelaren gissade rätt dvs inmatningen var densamma som sluptalet
			if (gissa===rand)
			{
						//Nollställa alla variabler
						gissa=null;
						input1=null;
						input2=null;
						rand=null;
						
						//Poäng
						r=r+1;
						
						//presentera rätt och ev fel
						alert("RÄTT! Antal rätt: " +r +" Antal fel: "+ f +" "); //+rand
						
						//Nytt spel blir tmp sann
						var tmp=window.confirm("Tryck OK för att spela igen!");
				
				if(tmp)
				{
						//sättes till sann så slumpgeneratorn tidigare inte körs
						nyttSpel=true;
						
				
						
						//Och ny kontroll
						kontroll();
						
								//nytt slumptal
						rand=randomIntFromInterval(input1, input2);
				}
				//Avsluta spelet
				else {sluta();}
			}
			//spelare hade fel
			else {
				if(start==false)return;
				
				//Lägg till fel-poäng
				f=f+1;
				
				//sättes till sann så slumpgeneratorn tidigare inte körs
				nyttSpel=true;
				
				//Presentera fel och statistik
				alert("Fel! Antal fel: " + f + " Antal rätt: "+ r +" ");//+rand
				
				//Gissa igen vid fel
				gissa = window.prompt("Gissa igen!", "");
				if(gissa===null){sluta();}
			}

		}
}
/*Denna fuktion ser till att variabler spelaren matar in inte är under 1 eller över 100,
inte har lämnat en blankrad och kollar så det är en siffra och inget annat*/
function kontroll(){
	
		//rensa variabler
		gissa=null;
		input1=null;
		input2=null;
	
	//Spelarens första inmatning
	input1 = window.prompt("Välj den första siffran mellan 1-100, tack!", "");
	if(input1==null)sluta();
		
		//Kontrollen
		if(isNaN(input1) || input1=="" || input1<1 || input1>100){
			window.alert("Endast siffor mellan 1-100!");
			
		//Om kontrollen blev sann ropar metoden på sig själv och allt börjar om	
		kontroll();
		
		//För att bryta aktivitet
		 return;
		}

	input2 = window.prompt("Välj den andra siffran mellan 1-100!", "");
	if(input2==null)sluta();
		 if(isNaN(input2)|| input2=="" || input2<1 || input2>100){
			 window.alert("Endast siffor mellan 1-100 tackar!");
		 kontroll();
		  return;
		 }

	gissa = window.prompt("Gissa nu vilken siffra mellan de du valt som slumpats fram!", "");
	if(gissa===null)sluta();
		if(isNaN(gissa) || gissa=="" || gissa<1 || gissa>100){
			window.alert("Endast siffor mellan 1-100 tack!");
		kontroll();
		 return;
		}
	 return;
	 
}
//Avslutar allt och laddar om sidan så slumptalen inte sparas
function sluta(){start=false; location.reload(true); return;}

//Slumpgenerator som skickar ett slump tal mellan de två tal som spelaren valde
function randomIntFromInterval(input1, input2){
	var t= Math.floor(Math.random()*(input2-input1+1)+input1);
	if(t<1)return 1;
	else return t;
	}

