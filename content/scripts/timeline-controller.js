define([    
    '../../modules/BaseModule', 
    'utils',    
    'content/scripts/labels',    
    'content/scripts/events',    
    'hbs!../../content/scripts/templates/events',    
    'hbs!../../content/scripts/templates/popups',    
    'hbs!../../content/scripts/templates/popup_map'
], function(BaseModule,Utils,labels,events,eventsHBS,popupsHBS,mapHBS) {
  'use strict';
  
  return BaseModule.extend({
    ui:{    
        
    },
    events:{    
        'click .it-btn-event': 'setMagnificPopupTemplate',
        'click .it-map-btn' : 'setMagnificPopupTemplate',
        'wb-ready.wb-filter  .wb-filter':'addPlaceholder'
    },

    initialize: function(options) {     
        //this.$events = $(options.it_events);        
        this.$events = $('.it-events ul');        
       
        this.$popups = $(options.popups);
        this.render();
        this.renderMaps();
    },  
    /////////////// ajouter le placeholder au filter /////////////////
  	addPlaceholder: function(e){
  		//$html = $(this).html();
  		var $filter = this.$el.find('.wb-filter');
		var $input = $filter.find('.input-group');
		var $text =$filter.find('>p');

		var $filterDiv = $('<div class=\'myFilter\'></div>');
		$filterDiv.append($input).append($text);
		$filterDiv.find('.wb-fltr-inpt').attr('placeholder',labels.Filter)

 		$filter.prepend($filterDiv);
  	},     
   	renderMaps:function(){
      this.template = mapHBS;        
      this.$popups.append(this.template({events:events,labels:labels}));      
   	},
   	render:function(){        
        this.template = eventsHBS;        
        
        this.$events.append(this.template({events:events, labels:labels}));        
        this.template = popupsHBS;
        this.$popups.append(this.template({events:events,labels:labels}));
		    $(window).trigger('timeline:eventsLoaded');
        $(this).trigger('timeline:eventsLoaded',this.eventsLoaded());        
    },
    setMagnificPopupTemplate:function(e){     
      this.$currentPopup = $(e.currentTarget).attr('data-mfp-src');
      var $el = $(e.currentTarget);
      var mfp = $.magnificPopup.instance;

      $el.magnificPopup({
      	items: { src: this.$currentPopup },
        type: 'inline',      	
        showCloseBtn:false,
      	removalDelay:500,
      	callbacks:{
      		beforeOpen: function(e) {
    				var $html = this.items[0].src instanceof $
    							? this.items[0].src
    							: $(this.items[0].src);				

    				var effect = $(this.st.mainEl).attr('data-effect');					
    				$html.addClass('mfp-with-anim');    				
    				$html.attr('data-effect', effect);
    				this.items[0].src = $html[0].outerHTML;
    				this.st.mainClass = effect;
    			}
        }        	
      });     
     $el.magnificPopup('open'); 
	 
	 if($("html").attr("lang") === "fr"){
		$(".mapView img.fr, .image.fr").each(function(){
			var src = $(this).attr("src");
			var newSRC;
			if(src.indexOf("_fr") === -1){
				var ext = src.substr(-4, 4);
				newSRC = src.slice(0, -4) + "_fr" + ext;
			}

			$(this).attr("src", newSRC);
		});
		$(".image.fr").each(function(){
			var link = $(this).parent("a.zoom");
			if(link.length){
				var href = link.attr("href");
				var newHREF;
				if(href.indexOf("_fr") === -1){
					var ext = href.substr(-4, 4);
					newHREF = href.slice(0, -4) + "_fr" + ext;
				}

				link.attr("href", newHREF);
			}
		});
	 }
    },
    eventsLoaded:function(){      
      var that = this;
      masterStructure.resources.scan();
      window[ "wb-filter" ] = {

		/*
		 * Filter Callback, called after items are filtered
		 *
		 * @$field: jQuery object of the search input field
		 * @elm: jQuery object of the element where the filter is applied
		 * @settings: JSON object of the user setting set on plugin initialisation
		 */
		filterCallback: function( $field, $elm, settings ) {
            
			var $eventsArray = that.$events.find('> li'),
			    even = false,$li;

			that.$events.removeClass('wb-not-filtered');
			
            for( var i =0; i< $eventsArray.length ; i++){							
                $li = $eventsArray.eq(i);
                if($li.hasClass('wb-fltr-out')){
                  $li.removeClass('odd').removeClass('even');                  
                }else{
                  $li.removeClass('even').removeClass('odd');
                  if(even){
                    $li.addClass('even');
                    
                   }else{
                     $li.addClass('odd');                    
                   }
                  even = !even;
                }
               
			}
		}
	};
		
		if($("html").attr("lang") === "fr"){
		$(".image.fr").each(function(){
			var src = $(this).attr("src");
			var newSRC;
			if(src.indexOf("_fr") === -1){
				var ext = src.substr(-4, 4);
				newSRC = src.slice(0, -4) + "_fr" + ext;
			}

			$(this).attr("src", newSRC);
		});
	 }
    }
  });
});
