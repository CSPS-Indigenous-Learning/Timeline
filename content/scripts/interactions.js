//DO NOT MODIFY ↓
define([
    'jquery'
], function($) {
//DO NOT MODIFY ↑

	function initialize() {
		setEvents();
	}

	function setEvents() {
		$(masterStructure)
			.on("Framework:systemReady", function() {
				systemReady();
			})
			.on("Framework:pageLoaded", function() {
				pageLoaded();
			});
	}

	/* is called only once, when the Course has loaded*/
	function systemReady() {
		//console.log("Interactions:systemReady");
		menuButons();
		
		//$("div.top-menu.container").off("click", ".quit");
	}

	/* is called on every page load, great for adding custom code to all pages*/
	function pageLoaded() {
		//console.log("Interactions:pageLoaded");
		setActivePage($('#dynamic_content').attr('class').substring(1));
		
		/*var lang = $("html").attr("lang");
		$(".quit").attr("href", "content/tools/quit_" + lang + ".html").attr("data-effect", "mfp-zoom-in").addClass("wb-lbx").attr("id", "quitButton");
		wb.add('.wb-lbx');*/
	}
	
	//Custom menu for this course, we want only buttons instead of the normal supermenu in medium-large views
	function menuButons(){
		$buttons = $('.supermenu').find('> li li');	

		$buttons.find('a').each(function(index){			
			$(this).attr('href','javascript:changePage(\'m'+index+'\')');
		});

		$('.supermenu').empty();
		$('.supermenu').append($buttons); // remove standard supermenu and append buttons instead have to FIX IE!!!
		
		$ul = $('<ul></ul>');
		$ul.attr('class','list-unstyled pull-right')
		$ul.append($buttons.clone());
		$('footer').html('').append($ul);	

	}
	function setActivePage(index){
		$('.supermenu li, footer li').removeClass('activePage');
		$('.supermenu li').eq(index).addClass('activePage');
		$('footer li').eq(index).addClass('activePage');
		 
	}
	initialize();

});