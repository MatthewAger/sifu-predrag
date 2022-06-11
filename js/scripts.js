// JavaScript Document

//Preloading

// Save a deferred object with postponed determination process
var dfd = $('img').imagesLoaded();

// Always
dfd.always( function(){
    //consle.log( 'all images has finished with loading, do some stuff...' );
	$('.preloader').addClass('loaded');

//	var myVid = document.getElementById("wing-chun-forms-video");	
//	$('#wing-chun-forms-video').bind('progress', function() {
//		//consle.log(myVid.readyState);
//		
//		if(myVid.readyState == 4) {
//		}
//	});
});

// Resolved
dfd.done( function( $images ){
    // callback provides one argument:
    // $images: the jQuery object with all images
    //consle.log( 'deferred is resolved with ' + $images.length + ' properly loaded images' );
});

// Rejected
dfd.fail( function( $images, $proper, $broken ){
    // callback provides three arguments:
    // $images: the jQuery object with all images
    // $proper: the jQuery object with properly loaded images
    // $broken: the jQuery object with broken images
    //consle.log( 'deferred is rejected with ' + $broken.length + ' out of ' + $images.length + ' images broken' );
});

// Notified
dfd.progress( function( isBroken, $images, $proper, $broken ){
    // function scope (this) is a jQuery object with image that has just finished loading
    // callback provides four arguments:
    // isBroken: boolean value of whether the loaded image (this) is broken
    // $images:  jQuery object with all images in set
    // $proper:  jQuery object with properly loaded images so far
    // $broken:  jQuery object with broken images so far
    //consle.log( 'Loading progress: ' + ( $proper.length + $broken.length ) + ' out of ' + $images.length );
	$('#preloader-percentage h1').html(Math.round((($proper.length + $broken.length)/$images.length)*100) + "%");
	$('#backing-light').css({ width: Math.round( ( ( $proper.length + $broken.length ) * 100 ) / $images.length ) + '%' });
});	

$(document).ready(function(e) {

	var $bg = $('.background-image'),
		$postBg = $('.post-bg'),
		backButton;
	
	$('a').click(function(e) {
	});
	
	$(window).resize(function() {
		//consle.log($(window).width());
	});
	
	$("#style1-video video, #style2-video video, #style3-video video, #style4-video video, #style5-video video").bind("ended", function () {
		window.location.hash = "wing-chun-forms";
	});


	//TOGGLE-BUTTONS
	var height = [516, 1711, 1116];
	$('.toggle-content').each(function(ix,el) {
		$(el).attr('data-height', height[ix]);
		$(el).not('.toggle-active').css({'height': '0'});
	});

	$('.toggle .toggle-title').click(function(e) {
		if($(this).next($('.toggle-content')).hasClass('toggle-active')) {
			$(this).find('span').removeClass('active');
			$(this).next($('.toggle-content')).removeClass('toggle-active').css({'height': '0'});
		} else {
			$(this).find('span').addClass('active');
			$(this).next($('.toggle-content')).addClass('toggle-active').css({'height': $(this).next($('.toggle-content')).attr('data-height')});
		}
	});
	
	$('.contact-button').on("click", function() {
		var type = $(this).attr("data-contact");
		//consle.log(type);
		$(this).parent('.table').find('.contact-cell').removeClass('active');
		$(this).parent('.table').find('.contact-cell[data-contact="' + type + '"]').addClass('active');
	});
	
});