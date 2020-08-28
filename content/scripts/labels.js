define(['utils'], function (Utils) {
	'use strict';

/* liste des constantes */
	var timeline_labels = {
		"closeOverlay": (Utils.lang === "en")?	
				"Close overlay (escape key)":
				"Fermer : Portable (touche d'échappement)",
		"Back_to_event_overlay":(Utils.lang === "en")?  
		    "Back to event (escape key)":
		    "Retour à l'évènement (touche d'échappement)",
		"Back_to_event":(Utils.lang === "en")?  
		    "Back to event":
		    "Retour à l'évènement",
		 "View_larger":(Utils.lang === "en")?	
		 	"View larger image":
		 	"Agrandir l'image",
		 "View_map":(Utils.lang === "en")?	
		 	"View map":
		 	"Voir la carte",
	 	 "Filter":(Utils.lang === "en")?	
		 	"Filter":
		 	"Filtrer"		

		 		
	}
	return timeline_labels;
})

