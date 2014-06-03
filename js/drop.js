   window.onload = function () {

			
			 
};
$( document ).ready(function() {
  // Handler for .ready() called.

  	var a = $('body');
				var b = $('.bar-title');
				console.log(b, "thisisbar title");


				$('.dropdown').click(function() {
			  			
			  			$( '.dropdown-expanded' ).toggle();	
			  			var visib = $( '.dropdown-expanded' ).css('display');

			  			if(visib=="block") {
			  				//alert("vidocz");	}
			  				$('.dropdown').css("background","#012559");
			  				$('.dropdown').css("color","#FFFFFF");
			  			}
			  			
			  			else if (visib=="none") {
			  					//alert("not visib")
			  				
			  				$('.dropdown').css("background","none");
			  				$('.dropdown').css("color","#012559");
			  			}
			  	})


});