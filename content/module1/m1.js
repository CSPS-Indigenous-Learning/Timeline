$(masterStructure).on("Framework:pageLoaded#m1", function(){
	require(['content/scripts/timeline-controller'], function(timeline){
			'use strict';    
		window.timeline = new timeline({			
			popups:'#popups'  
		});  	
	}); 
	//////////////////////////////////////		
	// code pour le scroll to anchor
	////////////////////////////////////////		
	$('a.anchor').click(function(e){ 	
		e.preventDefault();					
		var target = this.hash;
		var $target = $(target);		
		ScrollTo(target, function() { $target.trigger("setfocus.wb"); }); 
	}); 
	function ScrollTo(el, callback) { 
		if(el != ''){				
			$('html, body').animate({ scrollTop: $(el).offset().top - 50 }, 'slow', callback);
		}
	}	
	var $anchors = $("#navAnchors").find('a.anchor');
	var activeAnchor = $anchors.first().attr('href');

	function checkActiveAnchor(){
		$anchors.each(function(){
			var id = $(this).attr('href');    	
			// return visible ID
			if(visibleOnScreen($(id))){  	  		
				activeAnchor = id;  				
				return false;
			}
		  });


		  $anchors.each(function(){
			if($(this).attr('href') == activeAnchor)	$(this).addClass('active');
			else	$(this).removeClass('active');
		  });
	
	}
	
	//  // takes jQuery(element) a.k.a. $('element')
	function visibleOnScreen(element) {
		// window bottom edge + top edge
		var windowBottomEdge = $(window).scrollTop() + $(window).height();
		var windowTopEdge = $(window).scrollTop();
		// element top edge
		if(element.length){
			var elementTopEdge = element.offset().top;	
			var offset = 0;

			// if element is between window's top and bottom edges


			return elementTopEdge + offset>= windowTopEdge && elementTopEdge + offset <= windowBottomEdge;	
		}else{
			return false;
		}
		
	}
	window.onscroll = function() {checkActiveAnchor();};
});