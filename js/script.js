/*Fredrick Östlund 2016*/

	//Author variable
	var auth = "";
	
	//Variable holds country codes: used to fetch info from Aeris Weather api
	var sweden= "se";
	var gb= "gb";
	var fr= "fr";
	var it = "it";
	
	//Weather and date object holds here
	var sthlm_vader;
	var london_vader;
	var paris_vader;
	var rome_vader;
	
	//sunset and sunrise variables
	var solupp;
	var solner;
	
	//Clouds codes
	var sky;
	
	/************On start******************/
	$(document).ready(function() {
		
		//methods get the captials from json
		getCapital(sweden);
		getCapital(gb);
		getCapital(fr);
		getCapital(it);
	
	//Button on tab 2, get the location from geolactions api(and later a random book)
	$("#butt1").click(function() {
		getLocation();
	});
	
	//On tab 3, search field
	$("#butt2").click(function() {
		
		//clean input if necessary
		$('.input').val("");
		
		//fire the api search on KB
		searchAuthor();
	}); 
	
	/* HTML Geolocation API to get the geographical position of a user */
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
			
			//The random writer
			searchAuthor();
			} 
			else 
				alert("Geolocation is not supported by this browser.");
			};
	
		/*Take out the longitude and latitude and get the weatherdata from Areis api*/
		function showPosition(position) {
			var la_ =  position.coords.latitude;
			var lo_= position.coords.longitude;
			loadWeatherData(la_, lo_);
		};
		
		/*The user coordinates is used to fetch json from Aeris and 
		the Author function gets a random book from KB and all is set in a div*/
		function loadWeatherData(lat, lon){
			var weathers = "https://api.aerisapi.com/observations/" + lat + "," + lon + "?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
			$.getJSON(weathers).then(function(data) {
				
				//ob is the observation info that also holds the weather
				var ob = data.response.ob;
				
				//Get the weather
				ob = data.response.ob;
				
				vader = ob.cloudsCoded.toLowerCase();
				
				//Get a random writer depning in weather conditions
				getAuthor(vader);
				
				//Set the answer
				$('#foreCast').append('Today when the current weather is '+ vader + ' with a temperature of ' + ob.tempC + '°' + ' ');
				})
				//Error handling
				.fail(function() {
					alert('Error: ' + json.error.description);
					});
		};
		
		
		
		/*Takes a state and get the capital and country code*/
		function getCapital(state){
			
			//observation variable
			var obe;
			
			//Use the contry parameter to get json from Aeris thet hold info about diffrents contries
			var s1 ="https://api.aerisapi.com/countries/"+state+"?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
		
			$.getJSON(s1).then(function(data) {
	
				//get the capital
				var stad = data.response.profile.capital.toLowerCase();
			
				//get the country code (needed for weather call)
				var iso = data.response.place.iso.toLowerCase();
				
				//The string that built and are to be sent to the aeris server
				var s = "https://api.aerisapi.com/observations/" + stad + "," +iso+ "?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
				//var s ="https://api.aerisapi.com/observations/stockholm,se?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
				
				//Get the weather
				$.getJSON(s).then(function(data) {
					obe = data.response.ob;
					sky = obe.cloudsCoded.toLowerCase();
						});
						
						//get the sunrise and set
						var sm = "https://api.aerisapi.com/sunmoon/" + stad + "," +iso+ "?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
						//var s ="https://api.aerisapi.com/observations/stockholm,se?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
						
						 $("#load, #load2, #load3, #load4").show();
						$.getJSON(sm).then(function(data) {
						$("#load, #load2, #load3, #load4").hide();
							//sun's up and down times (an ISO datestamp )
							solupp = data.response[0].sun.riseISO;
							solner = data.response[0].sun.setISO;
							
							//If its sunset then this becomes true (the font symbols changes depning if it's night or day)
							var natt = dateCheck(solner);
							
							//Take out better looking time
							var ris = solupp.slice(11, 16);
							var set = solner.slice(11, 16);
							
							//Get a html string depning on weather and time
							sthlm_vader=weatherFontCheck(sky, natt);
							london_vader=weatherFontCheck(sky, natt);
							paris_vader=weatherFontCheck(sky, natt);
							rome_vader=weatherFontCheck(sky, natt);
							
							//	$("#swe").css({fontSize: 20});
						
							//Set the temperature, a weather symbol and sunrise/sunset
						 if(state===sweden){
							$('#swe').append(' Temperature ' + obe.tempC + '° &nbsp; &nbsp; ' + sthlm_vader + '<p style="font-size: 0.7em;">Sunrise ' + ris + '&nbsp;  ' + ' Sunset '+set + '</p>');
						 }
						 else if (state===gb){
							$('#gb').append('Temperature '  + obe.tempC + '° &nbsp; &nbsp; ' + london_vader + ' <p style="font-size: 0.7em;">Sunrise' + ris + '&nbsp;  ' + ' Sunset '+set + '</p>');
				
						 }
							else if (state===fr){
							$('#fr').append('Temperature '  + obe.tempC + '° &nbsp; &nbsp; ' +  paris_vader + ' <p style="font-size: 0.7em;">Sunrise ' + ris + '&nbsp;  ' + ' Sunset '+set+ '</p>');
						
							}
							else if (state===it){
							$('#it').append('Temperature '  + obe.tempC + '° &nbsp; &nbsp; ' +  rome_vader +' <p style="font-size: 0.7em;">Sunrise ' + ris + '&nbsp;  ' + ' Sunset '+set+ '</p>');
							//$('#foreCast').append('Today when the current weather is '+ vader + ' with a temperature of ' + ob.tempC + '°' + ' ');
					
							}
							});
			})
			.fail(function() {
				alert('Error: ' + json.error.description);
				});
		};
						
						/*Get the date now and compare with the time from the json and return if's daytime or not*/
						function dateCheck(solner) {
							var d1 = new Date(solner);
							var nu = new Date();
							var diff = nu > d1;
							return diff;
						}
						
			/* Compare the returning string from api, (cloudes and night-time) and return a html string */
			function weatherFontCheck(sky, natt){
				try {
				if (sky.includes("bk"))//Mostly Cloudy
					if (natt)
						return '<span class="weatherFont">I</span>';
				else 
					return '<span class="weatherFont">Y</span>';
							
				else if(sky.includes("cl"))//Clear
						if (natt)
						return '<span class="weatherFont">C</span>';
				else 
						return '<span class="weatherFont">B</span>';
					
				else if(sky.includes("fw"))//Fair/Mostly sunny
					if (natt)
						return '<span class="weatherFont">C</span>';
				else	
						return '<span class="weatherFont">B</span>';
							
				else if(sky.includes("sc"))//Partly cloudy
					if (natt)
						return '<span class="weatherFont">I</span>';
				else
						return '<span class="weatherFont">H</span>';
							
				else if(sky.includes("ov"))//Cloudy/Overcast
					if (natt)
						return '<span class="weatherFont">4</span>';
				else
						return '<span class="weatherFont">5</span>';
				else 
					return '<span class="weatherFont">Q</span>';
					}
			catch(err) {
			console.log("Error!");
				}
				/* finally {
				return '<span class="weatherFont">)</span>';
					} */
			}	

								
				/*Compare the string from api(cloudes) and selcts a author and a image. 
				The author is used to get json from KB, and a random takes out a "tip" of a book*/
				function getAuthor(vader){
					var rand;
						//chcks if a weather string holds a comapareable string
						if (vader.includes("bk"))
						{
							auth = "August+Strindberg";
							$("#my_image").attr("src","img/aug.png");
						}
						else if (vader.includes("cl")) //("mostly clear" || "mostly sunny"))
						{
							auth = "Karin+Boye";
							$("#my_image").attr("src","img/boye.png");
						}
						else if (vader.includes("sc"))
						{
							auth = "Stig+Dagerman";
							$("#my_image").attr("src","img/dag.png");
						}
						else if (vader.includes("ov"))
						{
							auth = "Bodil+Malmsten";
							$("#my_image").attr("src","img/aug.png");
						}
					
						else 
						{
							auth = "Kerstin+Ekman";
							$("#my_image").attr("src","img/aug.png");
						}
				
					//var f = "https://libris.kb.se/xsearch?query=Bodil+Malmsten&n=5&format=json";
				 
					//Search author on kb
					var f = "https://libris.kb.se/xsearch?query="+auth+"&n=5&format=json";
					$.getJSON(f, 
					function(data) {
						
						//take out a random number from the list tha comes from the api
						rand = Math.floor((Math.random() * (data.xsearch.list.length)-1));
						if(rand<=-1)rand=0;
				
					//set a book tip 
					$("#bookAndAuthor").append("Maybe this book could be nice to read: " + data.xsearch.list[rand].title + " By "+auth.replace("+", " "));
					});
				};
			
				/* Seach function for the user on KB*/
				function searchAuthor(){
					$("#input").val('');
					var t='';
					var f='';
					t= $("input").val();
					f = "https://libris.kb.se/xsearch?query="+t+"&n=5&format=json";
					$.getJSON(f, 
						function(data) {
						$("#KBauthor").append(data.xsearch.list[0].title + "<br> by " + data.xsearch.list[0].creator);
				
				});
			};
		
	});
	 



