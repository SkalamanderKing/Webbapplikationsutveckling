
/*If the user clicks on the Birdy image it swaps between "sleep" and "awake"*/
$(document).ready(function() {
    // attaching onclick event listener to all images with class img-responsive
    $('.birdy').click(function() {
		
        // get current event target (same as 'this')
	     var $this = $('.birdy');

		//attr() method returns the selectors attribute, it is stored in a variable
        var swap = $this.attr('src');
		
        // set the attribute src to a new value: the value of rel="" from .img-responsive
        $this.attr('src', $this.attr('rel'));
		
        // set rel's value to the old src value
        $this.attr('rel', swap);
    });
});

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

$(document).ready(function(){
$('.img-responsive').hover(
   function() {
         $(this).children('.img-responsive').fadeTo('slow', 0.5);
  },
   function() {
         $(this).children('.img-responsive').fadeTo('slow', 1);
  }
);
});
	
$(document).ready(function(){
	
 var $path = window.location.href;
	//if($path=='/C:/Users/F/Documents/GitHub/SkalamanderKing.github.io/rr.html')
		if($path=='https://skalamanderking.github.io/rr.html' || $path=='file:///C:/Users/F/Documents/GitHub/SkalamanderKing.github.io/rr.html'){
	$('.jumbotron').css('background-image', 'none');
	$( "nav" ).detach();
		}
	});
	
	$(document).ready(function(){
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
$('.cell').append( "<a href='index.html'>Home</a>" );

}
	

		});

		
		
		
		
	// $(document).ready(function(){
		// $( "#open" ).click(function() {
  //alert( "Handler for .click() called." );
 // $( "#open" ).load( "file:///C:/Users/F/Documents/GitHub/SkalamanderKing.github.io/rr.html", function() {
	 // $( "#open" ).load( 'https://skalamanderking.github.io/rr.html', function() {  
  //alert( "Load was performed." );
  //window.location.href = "file:///C:/Users/F/Documents/GitHub/SkalamanderKing.github.io/rr.html";
// window.open('file:///C:/Users/F/Documents/GitHub/SkalamanderKing.github.io/rr.html', 'newwindow', 'width=400', 'height=400');
  // window.open('https://skalamanderking.github.io/rr.html', 'newwindow', 'width=400', 'height=400');
// });

// });
// });
	
	