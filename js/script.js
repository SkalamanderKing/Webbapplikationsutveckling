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
	
	var soligt = '<span class="weatherFont">B</span>';
	var molnigt = '<span class="weatherFont">N</span>';
	$(document).ready(function() {
	
	getCapital(sweden);
	getCapital(gb);
	getCapital(fr);
	getCapital(it);
	

	/************click******************/
	$("button").click(function() {
		
	//hämta position
	getLocation();
	
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
			
			var sthlm_vader;
			var london_vader;
			
			var obe;
			var s1 ="https://api.aerisapi.com/countries/"+state+"?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
			$.getJSON(s1).then(function(data) {
			var ob = data.response.ob;
			var stad = data.response.profile.capital.toLowerCase();
			var iso = data.response.place.iso.toLowerCase();
			//console.log("stad "+ typeof stad +" iso "+ typeof iso);
			var s = "https://api.aerisapi.com/observations/" + stad + "," +iso+ "?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
			//var s ="https://api.aerisapi.com/observations/stockholm,se?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
						
						$.getJSON(s).then(function(data) {
							obe = data.response.ob;
							var vad = obe.weather.toLowerCase();
							//console.log("vader "+vader);
						//$('#sthlm').append('Temperature in ' + stad + " " + obe.tempC + '°' + ' ');
						//$('#foreCast').append('Today when the current weather is '+ vader + ' with a temperature of ' + ob.tempC + '°' + ' ');
						/*
						if (vad.includes("cloudy"))
						{
							var soligt = '<span class="weatherFont">B</span>';
						}
						else 
						{
							
						}
						*/
						
						
						});
	
						var sm = "https://api.aerisapi.com/sunmoon/" + stad + "," +iso+ "?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
						//var s ="https://api.aerisapi.com/observations/stockholm,se?client_id=2DLZxkOpvYq3SA8X4Ny4s&client_secret=h3ado5fV7TbT7RTvDsEnrat6hHBmCHHhypZFUPvM";
					$.getJSON(sm).then(function(data) {
								//var ts = data.response[0].dateTimeISO;
							var solupp = data.response[0].sun.riseISO;
							var solner = data.response[0].sun.setISO;
							console.log(solupp+ " "+solner);
							//"2017-01-24T08:13:15+01:00",
							var ris = solupp.slice(11, 16);
							var set = solner.slice(11, 16);
						
							if(state===sweden)
							$('#swe').append('Temperature in ' + stad + " " + obe.tempC + '° ' + soligt + '<br> Sun up ' + ris + '<br>' + ' Sun set '+set);
							
							else if (state===gb)
							$('#gb').append('Temperature in ' + stad + " " + obe.tempC + '°' + soligt + ' <br> Sun up ' + ris + '<br>' + ' Sun set '+set);
						
							else if (state===fr)
							$('#fr').append('Temperature in ' + stad + " " + obe.tempC + '°' +  soligt + ' <br> Sun up ' + ris + '<br>' + ' Sun set '+set);
							
							else if (state===it)
							$('#it').append('Temperature in ' + stad + " " + obe.tempC + '°' +  soligt +' <br> Sun up ' + ris + '<br>' + ' Sun set '+set);
						//$('#foreCast').append('Today when the current weather is '+ vader + ' with a temperature of ' + ob.tempC + '°' + ' ');
						
						});
						})
						.fail(function() {
						alert('Error: ' + json.error.description);
						});
						};

						
						
						
				//beroene på väder kommer olika författare och bok väljas
				function getAuthor(vader){
				//console.log(vader.includes("mostly" && "sunny"));
				var rand;
				var tmp;
						if (vader.includes("sunny" || "fair"))
						{
							auth = "August+Strindberg";
							$("#my_image").attr("src","img/sun.png");
						}
						else if (vader.includes(("mostly" && "sunny") || ("mostly" && "clear"))) //("mostly clear" || "mostly sunny"))
						{
							auth = "Karin+Boye";
							$("#my_image").attr("src","img/p_sun.png");
						}
						else if (vader.includes("mostly" && "cloudy"))
						{
							auth = "Stig+Dagerman";
							$("#my_image").attr("src","img/p_cloud.png");
						}
						else if (vader.includes("cloudy"))
						{
							auth = "Bodil+Malmsten";
							$("#my_image").attr("src","img/cloudy.png");
						}
						else if (vader.includes("clear"))
						{
							auth = "P.C.+Jersild";
							$("#my_image").attr("src","img/clear.png");
						}
						else 
						{
							auth = "Kerstin+Ekman";
							$("#my_image").attr("src","img/d_cloud.png");
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
		
	});
	 



