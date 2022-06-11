// JavaScript Document

// Set up a timer that will monitor the location and wait
// for hash-chnage events. The sandbox is the object on
// which we will trigger hash-change events.
hashController = (function( sandbox ){

	// Set the raw hash as the empty string. Since all
	// hash values begin with hash, any change will trigger
	// a change.
	var rawHash = "";

	// Set the current hash to be empty. If the raw hash is
	// empty, then the current hash is also empty.
	//
	// NOTE: The current hash will NOT start with the hash
	// sign.
	var currentHash = "";

	// I am the timer that monitors the hash.
	var timer = null;

	// I turn on the hash change monitoring.
	var start = function(){
		timer = setInterval(
			function(){
				// Get the hash out of the live location.
				var liveHash = window.location.hash;

				// Check to see if it is different than
				// the locally-stored raw hash.
				if (rawHash != liveHash){

					// Save the old hash for when we trigger
					// the hash-change event (we'll want to
					// announce the old hash as well).
					oldHash = currentHash;

					// Overwrite the loacl hash.
					rawHash = liveHash;

					// Clean the current hash (remove the
					// hash sign).
					currentHash = rawHash.substr( 1 );

					// Trigger a hash-change event on the
					// sandbox. We are going to assume that
					// the sandbox has the same bind/trigger
					// API as the jQuery object.
					sandbox.trigger({
						type: "hashchange",
						hash: currentHash,
						prevHash: oldHash
					});

				}
			},
			50
		);
	};

	// I turn off the hash change monitoring.
	var stop = function(){
		clearInterval( timer );
	};


	// Start the monitor.
	start();


	// Return the public interface for the hash controller.
	// This will grant external access to parts of the
	// underlying hash-monitoring mechanism.
	return({

		// I return the current hash value.
		getHash: function(){
			return( currentHash );
		},

		// I set the current hash value.
		setHash: function( newHash ){
			// When setting the hash, the first thing we
			// want to do is stop monitoring the location -
			// the external manifestation of our hash. We
			// do this because we don't want to announce
			// our hash-change event when programmatically
			// setting the hash. This will give us time to
			// adjust our internal model before we change
			// our external model.
			stop();

			// Store the old hash.
			oldHash = currentHash;

			// Change the internal hash.
			currentHash = newHash;

			// Create the raw hash.
			rawHash = ("#" + currentHash);

			// Set the live hash.
			window.location.hash = currentHash;

			// Now that we've updated our internal model
			// and the public manifestation (the location),
			// we can now start monitoring our hash again.
			start();

			// Return this object reference for method
			// chaining.
			return( this );
		}

	});

})( $( document ) );


// -------------------------------------------------- //
// -------------------------------------------------- //

// Bind to the hash-change event on the document in order
// to monitor events.
$( document ).bind(
	"hashchange",
	function( event ){
		
		var lh = location.hash, i, videos = ["#style1", "#style2", "#style3", "#style4", "#style5"], l = videos.length, video;

		setTimeout(function() {
			$('.back-button').removeClass('in-view');

			backButton = "#" + $(lh + "-link").attr('data-back') + "-back";
			$(backButton).addClass('in-view');
		}, 750);
		
		// Output event to the page.
	    if (!Modernizr.csstransitions) {
			if(lh === "#" || lh === "") {
				$('.collapsible').not('#home-buttons-left, #home-buttons-right').animate({
					'width':0
				}, 500);
				$('#home-buttons-left, #home-buttons-right').animate({
					'width':"50%"
				}, 500);
				$('.table-cell').removeClass('in-view');
			} else if(lh === "#about") {
				$('.collapsible').not('#home-buttons-left, #left-content').animate({
					'width':0
				}, 500);
				$('#home-buttons-left, #left-content').animate({
					'width':"50%"
				}, 500);
				$('#left-content').animate({
					'top':0
				}, 500);
				$('.table-cell').removeClass('in-view');
				$('#about-button .table-cell').addClass('in-view');
			} else if(lh === "#contact") {
				$('.collapsible').not('#home-buttons-left, #left-content').animate({
					'width':0
				}, 500);
				$('#home-buttons-left, #left-content').animate({
					'width':"50%"
				}, 500);
				$('#left-content').animate({
					'top':"-100%"
				}, 500);
				$('.table-cell').removeClass('in-view');
				$('#contact-button .table-cell').addClass('in-view');
			} else if(lh === "#wing-chun-forms") {
				$('.collapsible').not('#home-buttons-right, #wing-chun-forms-content').animate({
					'width':0
				}, 500);
				$('#home-buttons-right, #wing-chun-forms-content').animate({
					'width':"50%"
				}, 500);
				$('.table-cell').removeClass('in-view');
				$('#wing-chun-forms-button .table-cell').addClass('in-view');
			} else if(lh === "#services-and-merchandise") {
				$('.collapsible').not('#home-buttons-right, #services-and-merchandise-buttons').animate({
					'width':0
				}, 500);
				$('#home-buttons-right, #services-and-merchandise-buttons').animate({
					'width':"50%"
				}, 500);
				$('.table-cell').removeClass('in-view');
				$('#services-and-merchandise-button .table-cell').addClass('in-view');
			} else if(lh === "#classes") {
				$('.collapsible').not('#services-and-merchandise-buttons, #right-content').animate({
					'width':0
				}, 500);
				$('#services-and-merchandise-buttons, #right-content').animate({
					'width':"50%"
				}, 500);
				$('#right-content').animate({
					'top':0
				}, 500);
				$('.table-cell').removeClass('in-view');
				$('#wing-chun-classes-button .table-cell').addClass('in-view');
				setTimeout(function() {
					googleMapClasses();
				}, 1000);
			} else if(lh === "#acupressure") {
				$('.collapsible').not('#services-and-merchandise-buttons, #right-content').animate({
					'width':0
				}, 500);
				$('#services-and-merchandise-buttons, #right-content').animate({
					'width':"50%"
				}, 500);
				$('#right-content').animate({
					'top':"-100%"
				}, 500);
				$('.table-cell').removeClass('in-view');
				$('#acupressure-button .table-cell').addClass('in-view');
			} else if(lh === "#cds") {
				$('.collapsible').not('#services-and-merchandise-buttons, #right-content').animate({
					'width':0
				}, 500);
				$('#services-and-merchandise-buttons, #right-content').animate({
					'width':"50%"
				}, 500);
				$('#right-content').animate({
					'top':"-200%"
				}, 500);
				$('.table-cell').removeClass('in-view');
				$('#cds-button .table-cell').addClass('in-view');
			} else if(lh === "#books") {
				$('.collapsible').not('#services-and-merchandise-buttons, #right-content').animate({
					'width':0
				}, 500);
				$('#services-and-merchandise-buttons, #right-content').animate({
					'width':"50%"
				}, 500);
				$('#right-content').animate({
					'top':"-300%"
				}, 500);
				$('.table-cell').removeClass('in-view');
				$('#books-button .table-cell').addClass('in-view');
			} else if(lh === "#style1") {
				$('.video').removeClass('in-view');
				$('#style1-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style1-video').find('video').get(0).play();
				}, 1500);
			} else if(lh === "#style2") {
				$('.video').removeClass('in-view');
				$('#style2-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style2-video').find('video').get(0).play();
				}, 1500);
			} else if(lh === "#style3") {
				$('.video').removeClass('in-view');
				$('#style3-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style3-video').find('video').get(0).play();
				}, 1500);
			} else if(lh === "#style4") {
				$('.video').removeClass('in-view');
				$('#style4-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style4-video').find('video').get(0).play();
				}, 1500);
			} else if(lh === "#style5") {
				$('.video').removeClass('in-view');
				$('#style5-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style5-video').find('video').get(0).play();
				}, 1500);
			}
		} else {
			if(lh === "#" || lh === "") {
				$('.collapsible').addClass('collapse');
				$('#home-buttons-left, #home-buttons-right').removeClass('collapse');
				$('.table-cell').removeClass('in-view');
			} else if(lh === "#about") {
				$('.collapsible').addClass('collapse');
				$('#home-buttons-left, #left-content').removeClass('collapse');
				$('#left-content').removeClass('transform-0').removeClass('transform-1');
				$('#left-content').addClass('transform-0');
				$('.table-cell').removeClass('in-view');
				$('#about-button .table-cell').addClass('in-view');
			} else if(lh === "#contact") {
				$('.collapsible').addClass('collapse');
				$('#home-buttons-left, #left-content').removeClass('collapse');
				$('#left-content').removeClass('transform-0').removeClass('transform-1');
				$('#left-content').addClass('transform-1');
				$('.table-cell').removeClass('in-view');
				$('#contact-button .table-cell').addClass('in-view');
			} else if(lh === "#wing-chun-forms") {
				$('.collapsible').addClass('collapse');
				$('#home-buttons-right, #wing-chun-forms-content').removeClass('collapse');
				$('.table-cell').removeClass('in-view');
				$('#wing-chun-forms-button .table-cell').addClass('in-view');
			} else if(lh === "#services-and-merchandise") {
				$('.collapsible').addClass('collapse');
				$('#home-buttons-right, #services-and-merchandise-buttons').removeClass('collapse');
				$('.table-cell').removeClass('in-view');
				$('#services-and-merchandise-button .table-cell').addClass('in-view');
			} else if(lh === "#classes") {
				$('.collapsible').addClass('collapse');
				$('#services-and-merchandise-buttons, #right-content').removeClass('collapse');
				$('#right-content').removeClass('transform-0').removeClass('transform-1').removeClass('transform-2').removeClass('transform-3');
				$('#right-content').addClass('transform-0');
				$('.table-cell').removeClass('in-view');
				$('#wing-chun-classes-button .table-cell').addClass('in-view');
				setTimeout(function() {
					googleMapClasses();
				}, 1000);
			} else if(lh === "#acupressure") {
				$('.collapsible').addClass('collapse');
				$('#services-and-merchandise-buttons, #right-content').removeClass('collapse');
				$('#right-content').removeClass('transform-0').removeClass('transform-1').removeClass('transform-2').removeClass('transform-3');
				$('#right-content').addClass('transform-1');
				$('.table-cell').removeClass('in-view');
				$('#acupressure-button .table-cell').addClass('in-view');
			} else if(lh === "#cds") {
				$('.collapsible').addClass('collapse');
				$('#services-and-merchandise-buttons, #right-content').removeClass('collapse');
				$('#right-content').removeClass('transform-0').removeClass('transform-1').removeClass('transform-2').removeClass('transform-3');
				$('#right-content').addClass('transform-2');
				$('.table-cell').removeClass('in-view');
				$('#cds-button .table-cell').addClass('in-view');
			} else if(lh === "#books") {
				$('.collapsible').addClass('collapse');
				$('#services-and-merchandise-buttons, #right-content').removeClass('collapse');
				$('#right-content').removeClass('transform-0').removeClass('transform-1').removeClass('transform-2').removeClass('transform-3');
				$('#right-content').addClass('transform-3');
				$('.table-cell').removeClass('in-view');
				$('#books-button .table-cell').addClass('in-view');
			} else if(lh === "#style1") {
				$('.video').removeClass('in-view');
				$('#style1-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style1-video').find('video').get(0).play();
				}, 1500);
			} else if(lh === "#style2") {
				$('.video').removeClass('in-view');
				$('#style2-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style2-video').find('video').get(0).play();
				}, 1500);
			} else if(lh === "#style3") {
				$('.video').removeClass('in-view');
				$('#style3-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style3-video').find('video').get(0).play();
				}, 1500);
			} else if(lh === "#style4") {
				$('.video').removeClass('in-view');
				$('#style4-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style4-video').find('video').get(0).play();
				}, 1500);
			} else if(lh === "#style5") {
				$('.video').removeClass('in-view');
				$('#style5-video').addClass('in-view');
	
				setTimeout(function() {
					$('#style5-video').find('video').get(0).play();
				}, 1500);
			}
		}
		
		if(jQuery.inArray(lh, videos) !== -1) {
			$('section').addClass('video-view');
		} else {
			$('section').removeClass('video-view');
			setTimeout(function() {
				$('.video').removeClass('in-view');
				$('#style1-video').find('video').get(0).pause();
				$('#style2-video').find('video').get(0).pause();
				$('#style3-video').find('video').get(0).pause();
				$('#style4-video').find('video').get(0).pause();
				$('#style5-video').find('video').get(0).pause();
				if($('#style1-video').find('video').get(0).currentTime !== 0) {
					$('#style1-video').find('video').get(0).currentTime = 0;
				}
				if($('#style2-video').find('video').get(0).currentTime !== 0) {
					$('#style2-video').find('video').get(0).currentTime = 0;
				}
				if($('#style3-video').find('video').get(0).currentTime !== 0) {
					$('#style3-video').find('video').get(0).currentTime = 0;
				}
				if($('#style4-video').find('video').get(0).currentTime !== 0) {
					$('#style4-video').find('video').get(0).currentTime = 0;
				}
				if($('#style5-video').find('video').get(0).currentTime !== 0) {
					$('#style5-video').find('video').get(0).currentTime = 0;
				}
			}, 1500);
		}
		
		
		if(lh === "#wing-chun-forms") {
			setTimeout(function() {
				$('#wing-chun-forms-video').get(0).play();
			}, 1500);
		} else {
			setTimeout(function() {
				$('#wing-chun-forms-video').get(0).pause();
				if($('#wing-chun-forms-video').get(0).currentTime !== 0) {
					$('#wing-chun-forms-video').get(0).currentTime = 0;
				}
			}, 1500);
		}
	}
);
