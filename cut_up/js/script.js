/*============================*/
/* Update main product image. */
/*============================*/
var switchImage = function(newImageSrc, newImage, mainImageDomEl) {
  // newImageSrc is the path of the new image in the same size as originalImage is sized.
  // newImage is Shopify's object representation of the new image, with various attributes, such as scr, id, position.
  // mainImageDomEl is the passed domElement, which has not yet been manipulated. Let's manipulate it now.
  jQuery(mainImageDomEl).parents('a').attr('href', newImageSrc.replace('_grande', '_1024x1024'));
  jQuery(mainImageDomEl).attr('src', newImageSrc);  
};


jQuery(function($) {
	
	$("#customer_login_link").wrapInner("<span>");
	
	/* Scroll to hash */
	/*==========================*/
	/*
	setTimeout(function() {
		if (location.hash) {
			window.scrollTo(0, 0);
		}
	}, 1);

	setTimeout(function(){
		$("a[href="+ location.hash +"]").trigger("click", function(){ });
	}, 500);
	*/

	if ( $("body").hasClass("template-index") ) {
		// scroll to hash
		$('a[href*=#]:not([href=#]):not([href=#contact])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	} else {
		$("a[href=#individual-products], a[href=#bundles]").each(function(){
			var old_href = $(this).attr("href");
			$(this).attr("href", "/"+old_href);
		});
	}


	/* Helpful Text Formats */
	/*==========================*/
	var blue 		= "#0000ff",			// description
		rgbBlue		= "rgb(0, 0, 255)",
		red 		= "#ff0000",			// value
		rgbRed 		= "rgb(255, 0, 0)",
		green 		= "#00ff00",			// shipping
		rgbGreen 	= "rgb(0, 255, 0)",
		orange 		= "#ff9900", 			// orange
		rgbOrange 	= "rgb(255, 153, 0)",
		purple		= "#9900ff", 			// additional only show in modal
		rgbPurple	= "rgb(153, 0, 255)";

	if ( $(".product").length ) {

		$("span").each(function(){
			var style = $(this).attr("style");

			if (style) {

				// check for blue
				if (style.indexOf(blue) > -1 || style.indexOf(rgbBlue) > -1) {
					$(this).addClass("blue");
					$(this).parent().hide().addClass("description");
				}

				// check for red
				if (style.indexOf(red) > -1 || style.indexOf(rgbRed) > -1) {
					var value = $(this).text();
					$(this).closest(".content").find("h1").before("<p class='value'>"+ value +"</p>");
					$(this).remove();
				}

				// check for green
				if (style.indexOf(green) > -1 || style.indexOf(rgbGreen) > -1) {
					$(this).addClass("green");
				}

				// check for green
				if (style.indexOf(purple) > -1 || style.indexOf(rgbPurple) > -1) {
					$(this).addClass("purple");
					$(this).parent().hide().addClass("description-modal");
				}

				// check for orange
				if (style.indexOf(purple) > -1 || style.indexOf(rgbPurple) > -1) {
					$(this).addClass("orange");
				}

			}

		});

		// remove empty <p>
		$(".product p").each(function(){
			if ($(this).text() == "") { $(this).remove(); }
		});

	}// if





                    
  /* Placeholder JS */
  /*==========================*/
  var test = document.createElement('input');
  if (!('placeholder' in test)) {
    $('[placeholder]').each(function(){
      if ($(this).val() === '') {
        var hint = $(this).attr('placeholder');
        $(this).val(hint).addClass('hint');
      }
    });
    $('[placeholder]').focus(function() {
      if ($(this).val() === $(this).attr('placeholder')) {
        $(this).val('').removeClass('hint');
      }
    }).blur(function() {
      if ($(this).val() === '') {
        $(this).val($(this).attr('placeholder')).addClass('hint');
      }
    });    
  }

  /* Form validation JS */
  /*==========================*/

  $('input.error, textarea.error').focus(function() {
    $(this).removeClass('error');
  });

  $('form :submit').click(function() {
    $(this).parents('form').find('input.hint, textarea.hint').each(function() {
      $(this).val('').removeClass('hint');
    });
    return true;
  });
  
  /* Remove SVG images to avoid broken images in all browsers that don't support SVG. */
  /*==========================*/
  
  var supportsSVG = function() {
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
  }  
  if (!supportsSVG()) {
    $('img[src*=".svg"]').remove();
  }
  
  /* Prepare to have floated images fill the width of the design on blog pages on small devices. */
  /*==========================*/ 
    
  var images = $('.article img').load(function() {
    var src = $(this).attr('src').replace(/_grande\.|_large\.|_medium\.|_small\./, '.');
    var width = $(this).width();
    $(this).attr('src', src).attr('width', width).removeAttr('height');
  });
  
  /* Update main product image when a thumbnail is clicked. */
  /*==========================*/
  $('.product-photo-thumb a').on('click', function(e) { 
    e.preventDefault();
    switchImage($(this).attr('href'), null, $('.product-photo-container img')[0]);
  } );
  
});
