/*Fredrick Östlund 2016*/


/*Hover effect on images, uses css and changes opacity*/
/*
$(document).ready(function(){

  $('.img-responsive').hover(
    function(){
     $(this).addClass('active');
	 
    },
    function(){
    $(this).removeClass('active');
    }
  );

});
*/
  var auth = "";
	var vart = "Stockholm,SE";
	var sweden= "se";
	var gb= "gb";
	var fr= "fr";
	var it = "it";
	

			var sthlm_vader;
			var london_vader;
			var paris_vader;
			var rome_vader;
			
			var solupp;
			var solner;
			
	$(document).ready(function() {
	
	getCapital(sweden);
	getCapital(gb);
	getCapital(fr);
	getCapital(it);
	

	/************click******************/
	$("#butt1").click(function() {
		
	//hämta position
	getLocation();
	
	searchAuthor();
	
	}); 
		$("#butt2").click(function() {
	  $('.input').val("");
	
	searchAuthor();
	
	}); 
		
		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} 
			else 
				x.innerHTML = "Geolocation is not supported by this browser.";
		};
	
		//sätt in anv position i variabler som ska anv för att ta fram vädret
		function showPosition(position) {
			var la_ =  position.coords.latitude;
			var lo_= position.coords.longitude;
			loadWeatherData(la_, lo_);
		};
	
	 function loadWeatherData(lat, lon){
	  var weathers = "https://api.aerisapi.com/observations/" + lat + "," + lon + "?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
		$.getJSON(weathers).then(function(data) {
				var ob = data.response.ob;
				var vader = ob.weather.toLowerCase();
			//console.log("vader "+vader);
				getAuthor(vader);
				$('#foreCast').append('Today when the current weather is '+ vader + ' with a temperature of ' + ob.tempC + '°' + ' ');
				})
    .fail(function() {
        alert('Error: ' + json.error.description);
    });
};

	

		function getCapital(state){
			
		
			var sky; 
			var obe;
			var s1 ="https://api.aerisapi.com/countries/"+state+"?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
			$.getJSON(s1).then(function(data) {
				
			//get the object	
			var ob = data.response.ob;
			
			//get the capital
			var stad = data.response.profile.capital.toLowerCase();
			
			//get the country code (needed for weather call)
			var iso = data.response.place.iso.toLowerCase();
			
			//console.log("stad "+ typeof stad +" iso "+ typeof iso);
			
			//the forcaste 
			var s = "https://api.aerisapi.com/observations/" + stad + "," +iso+ "?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
			//var s ="https://api.aerisapi.com/observations/stockholm,se?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
						
						$.getJSON(s).then(function(data) {
							obe = data.response.ob;
							sky = obe.cloudsCoded.toLowerCase();
							//console.log("vader "+vader);
						//$('#sthlm').append('Temperature in ' + stad + " " + obe.tempC + '°' + ' ');
						//$('#foreCast').append('Today when the current weather is '+ vader + ' with a temperature of ' + ob.tempC + '°' + ' ');
						
						
						
						//console.log("vader "+ obe.weather);

						
						
						});
						//get the sun rise and set
						var sm = "https://api.aerisapi.com/sunmoon/" + stad + "," +iso+ "?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
						//var s ="https://api.aerisapi.com/observations/stockholm,se?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
					$.getJSON(sm).then(function(data) {
								//var ts = data.response[0].dateTimeISO;
							solupp = data.response[0].sun.riseISO;
							solner = data.response[0].sun.setISO;
							
							var natt = dateCheck(solner);
							
							//"2017-01-24T08:13:15+01:00",
							var ris = solupp.slice(11, 16);
							var set = solner.slice(11, 16);
							
							sthlm_vader=weatherFontCheck(sky, natt);
							london_vader=weatherFontCheck(sky, natt);
							paris_vader=weatherFontCheck(sky, natt);
							rome_vader=weatherFontCheck(sky, natt);
							
						//	$("#swe").css({fontSize: 20});
						
							if(state===sweden)
							$('#swe').append(' Temperature ' + obe.tempC + '° &nbsp; &nbsp; ' + sthlm_vader + '<p style="font-size: 0.7em;">Sunrise ' + ris + '&nbsp;  ' + ' Sunset '+set + '</p>');
							
							else if (state===gb)
							$('#gb').append('Temperature '  + obe.tempC + '° &nbsp; &nbsp; ' + london_vader + ' <p style="font-size: 0.7em;">Sunrise' + ris + '&nbsp;  ' + ' Sunset '+set + '</p>');
						
							else if (state===fr)
							$('#fr').append('Temperature '  + obe.tempC + '° &nbsp; &nbsp; ' +  paris_vader + ' <p style="font-size: 0.7em;">Sunrise ' + ris + '&nbsp;  ' + ' Sunset '+set+ '</p>');
							
							else if (state===it)
							$('#it').append('Temperature '  + obe.tempC + '° &nbsp; &nbsp; ' +  rome_vader +' <p style="font-size: 0.7em;">Sunrise ' + ris + '&nbsp;  ' + ' Sunset '+set+ '</p>');
						//$('#foreCast').append('Today when the current weather is '+ vader + ' with a temperature of ' + ob.tempC + '°' + ' ');
						
						});
						})
						.fail(function() {
						alert('Error: ' + json.error.description);
						});
						};
						
//var solner = '2017-01-22T08:11:15+01:00';
function dateCheck(solner) {
	var d1 = new Date(solner);
	var nu = new Date();
	var diff = nu > d1;
	console.log("test " + diff +" löpe " + nu );
	return diff;

}
						//check the cloudynes and night-time
						function weatherFontCheck(sky, natt){
							
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
							
							
				//beroene på väder kommer olika författare och bok väljas
				function getAuthor(vader){

				var rand;
				var tmp;
						if (vader.includes("sunny" || "fair"))
						{
							auth = "August+Strindberg";
							$("#my_image").attr("src","img/aug.png");
						}
						else if (vader.includes(("mostly" && "sunny") || ("mostly" && "clear"))) //("mostly clear" || "mostly sunny"))
						{
							auth = "Karin+Boye";
							$("#my_image").attr("src","img/boye.png");
						}
						else if (vader.includes("mostly" && "cloudy"))
						{
							auth = "Stig+Dagerman";
							$("#my_image").attr("src","img/dag.png");
						}
						else if (vader.includes("cloudy"))
						{
							auth = "Bodil+Malmsten";
							$("#my_image").attr("src","img/aug.png");
						}
						else if (vader.includes("clear"))
						{
							auth = "P.C.+Jersild";
							$("#my_image").attr("src","img/aug.png");
						}
						else 
						{
							auth = "Kerstin+Ekman";
							$("#my_image").attr("src","img/aug.png");
						}
				
			//var f = "https://libris.kb.se/xsearch?query=Bodil+Malmsten&n=5&format=json";
				 
					//sök efter förfatare på kb
					var f = "https://libris.kb.se/xsearch?query="+auth+"&n=5&format=json";
					$.getJSON(f, 
					function(data) {
					//console.log(data.xsearch.list.length);
					rand = Math.floor((Math.random() * (data.xsearch.list.length)-1));
					if(rand<=-1)rand=0;
					//console.log("rand" +rand);
					$("#bookAndAuthor").append("Maybe this book could be nice to read: " + data.xsearch.list[rand].title + " By "+auth.replace("+", " "));
					});
			};
			
					//search author at KB
				function searchAuthor(){
					 $("#input").val('');
					var t='';
					var f='';
					var auth= 'August+Strindberg';
				 	t= $("input").val();
				
					f = "https://libris.kb.se/xsearch?query="+t+"&n=5&format=json";
										//rand = Math.floor((Math.random() * (data.xsearch.list.length)-1));
					//if(rand<=-1)rand=0;
					$.getJSON(f, 
					function(data) {
					$("#KBauthor").append(data.xsearch.list[0].title + "<br> by " + data.xsearch.list[0].creator);
				
				});
			};
		
	});
	 



