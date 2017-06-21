$(document).ready(function() {
  
  // Add scrollspy to <body>
  $('body').scrollspy({target: "#nav", offset: 100});

  // Add smooth scrolling on all links inside the navbar
  $("#nav a").on('click', function(event) {

    // Make sure link has a hash value
    if (this.hash !== "") {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Animate with jQuery
      $('html, body').animate({scrollTop: $(hash).offset().top}, 1000, function(){

        // Add hash (#) to URL when done scrolling
        window.location.hash = hash;
      });
    }
  });
  
  // Fill nav background on scroll
  $(document).scroll(function () {
	  var $nav = $(".fixed-top");
	  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
	});

});