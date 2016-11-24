

/* $(document).ready(function(){
$('.img-responsive').on({
    'click': function(){
        $('.img-responsive').attr('src','birdy2.png'); //../img/

    }
});
});
 */

// $(document).ready(function(){
// $('.img-responsive').hover(
    // function(){
     // $(this).addClass('active');
    // },
    // function(){
    // $(this).removeClass('active');
    // }
  // );

// });

/*If the user clicks on the Birdy image it swaps between "sleep" and "awake"*/
$(document).ready(function() {
    // attaching onclick event listener to all images with class img-responsive
    $('.img-responsive').click(function() {
		
        // get current event target (same as 'this')
	     var $this = $('.img-responsive');

		//attr() method returns the selectors attribute, it is stored in a variable
        var swap = $this.attr('src');
		
        // set the attribute src to a new value: the value of rel="" from .img-responsive
        $this.attr('src', $this.attr('rel'));
		
        // set rel's value to the old src value
        $this.attr('rel', swap);
    });
});