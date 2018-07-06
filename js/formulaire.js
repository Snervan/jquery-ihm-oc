/**************************************************************
*   IHM Activity (activity in part 4 on OC)                   *
*                                                             *
*   @author : Snervan (RetroMan on OC)                        *
*   @project : IHM Activity                                   *
*   @description : generate our own form with IHM buttons     *
*                  on the right. fadeIn and fadeOut right     *
*                  form. Add help messages with AJAX.         *
*                                                             *
*                                                             *
***************************************************************/

$(function() {
	$('#droite > :button').hide().fadeIn(2000);
	
	var formGauche = $('<form id="formulaire"></form>');
	$('#gauche').prepend(formGauche);

	//On empêche la soumission du formulaire de gauche
	formGauche.submit(function(event) {
		event.preventDefault();
	});

	//On désactive le bouton "Zone de texte" pour des raisons de cohérence une fois la page chargée
	$('#droite > :button:eq(0)').prop("disabled", false);
	$('#droite > :button:eq(1)').prop("disabled", true);	

	//On désactive le "bouton" et l'active uniquement s'il y a au moins un input
	$('#droite > :button:eq(2)').prop("disabled", true);

	// Mode d'insertion différent du span et de l'input si on a ajouté le bouton au formulaire qu'on a généré
	// Permet également de vérifier si on a ajouté le "submit" dans le div gauche
	var buttonInserted = false;

	// Change à true si on a ajouté au moins un input de type texte dans le div gauche
	// Variable utilisé comme condition pour ré-activer correctement le bouton "bouton"
	var showingAddButton = false;

	//Affiche un message d'aide une fois la page chargée pour guider l'utilisateur
	$('#droite').append(helpMessages('loadedPage'));

	function reEnableButton(typeForm) {
		typeForm.prop("disabled", false);
	}

	function mouseFunc(type, value) {
		var newInput = "<input type='" + type + "' value='" + value + "'>"

		/* On retourne le nouvel input de type submit ou reset avec les évènements souris
		   pour ajouter une ombre au survol */
		return $(newInput).mouseover(function() {
			$(this).css('box-shadow', '3px 3px 4px black');
		}).mouseout(function() {
			$(this).css('box-shadow', 'none');
		});
	}

	//Retourne un nouvel élément créé qui contiendra le message d'aide chargé
	function helpMessages(helpName) {
		var helpMessage = $("<div id='helpMessage'></div>");
		var fileToLoad = 'aide.htm #' + String(helpName);

		helpMessage.load(fileToLoad, function() {
			helpMessage.hide().fadeIn(1500);
		});
		return helpMessage;
	}

	function createForms(formId, inputId, textToInsert) {
		// Sert uniquement à supprimer le message d'aide lors du premier chargement de la page
		if($('#helpMessage').length !== 0) {
			$('#helpMessage').finish().fadeOut(200, function() {
				$(this).remove();
			});
		}

		var typeForm = $("<form id='" + formId + "'></form>");
		typeForm.append($("<label for='" + inputId + "'></label>").text(String(textToInsert + " ")));
		typeForm.append($("<input type='text' id='" + inputId + "' required>"));
		typeForm.append($("<br>"));

		//On créé les input type submit et reset
		typeForm.append(mouseFunc('submit', 'OK'));
		typeForm.append(mouseFunc('reset', 'Annuler'));

		typeForm.hide().fadeIn(1500);
		return typeForm;
	}

	function removeForms(typeForm) {

		$('#helpMessage').finish().fadeOut(400, function() {
			$(this).remove();

			typeForm.finish().fadeOut(400, function() {
				$(this).remove();
			});
		});

		if(buttonInserted) $('#droite > :button:eq(2)').fadeOut(700, function() {
			$(this).remove();
		});

		$('#droite > :button:eq(0)').css("opacity", "1");
		$('#droite > :button:eq(1)').css("opacity", "1");
	}

	//Fonction d'ombrage pour "Label", "Zone de texte", "Bouton"
	function ombrage() {
		$('#droite button:hover').css('box-shadow', '3px 3px 4px black');

		$('#droite button').mouseout(function() {
			$(this).css('box-shadow', 'none') 
		});

		$('#droite button:disabled').css('box-shadow', 'none');
	}

	//On appelle la fonction régulièrement
	setInterval(ombrage, 200);

	//Evénement "clic" pour le bouton "Label"
	$(':button:first').click(function() {

		var formLabel = createForms("labelNom", "labelText", "Nom du label :");

		$(this).prop("disabled", true);
		$(this).css("opacity", "0.3");

		//"Bouton" désactivé si on click sur le bouton "Label"
		$('#droite > :button:eq(2)').prop("disabled", true);

		formLabel.submit(function(event) {
			event.preventDefault();

			var insertSpan = $("<span></span>").text($('#labelText').val() + " : ");

			if(buttonInserted) {
				$('#formulaire > :input[type="submit"]').before($("<span></span>").text($('#labelText').val() + " : "));
			} else {
				$('#formulaire').append($("<span></span>").text($('#labelText').val() + " : "));
			}

			$('#droite > :button:eq(1)').prop("disabled", false);

			if (showingAddButton) { $('#droite > :button:eq(2)').prop("disabled", false); }
			
			removeForms(formLabel);
		});

		formLabel.on('reset', function() {
			removeForms(formLabel);
			$('#droite > :button:eq(0)').prop("disabled", false);
			$('#droite > :button:eq(0)').css("opacity", "1");

			if (showingAddButton) { $('#droite > :button:eq(2)').prop("disabled", false); }
		});

		$('#droite').append(formLabel);
		$('#droite').append(helpMessages('aideLabel'));
		$('#labelText').focus();
	});

	//Evènement "clic" pour le bouton "Zone de texte"
	$(':button:eq(1)').click(function() {
		
		$(this).prop("disabled", true);
		$(this).css("opacity", "0.3");

		//"Bouton" désactivé si on click sur le bouton "Zone de texte"
		$('#droite > :button:eq(2)').prop("disabled", true);

		var formTextZone = createForms("textZone", "idInput", "id de la zone de texte :");
		
		formTextZone.submit(function(event) {
			event.preventDefault();

			var inputText = $("<input type='text'>");
			inputText.attr('id', $('#idInput').val());
			inputText.attr('name', $('#idInput').val());

			if(buttonInserted) {
				$('#formulaire > :input[type="submit"]').before(inputText);
				$('#formulaire > :input[type="submit"]').before($('<br>'));
			} else {
				$('#formulaire').append(inputText);
				$('#formulaire').append($('<br>'));
			}	

			$('#droite > :button:eq(0)').prop("disabled", false);

			// Input inséré, on active le bouton "bouton", on met la variable à true car il y a au moins un input 
			// et on enlève le formulaire d'ajout d'input
			$('#droite > :button:eq(2)').prop("disabled", false);
			showingAddButton = true;
			removeForms(formTextZone);
		});

		formTextZone.on('reset', function() {
			removeForms(formTextZone);
			$('#droite > :button:eq(1)').prop("disabled", false);
			$('#droite > :button:eq(1)').css("opacity", "1");

			if (showingAddButton) { $('#droite > :button:eq(2)').prop("disabled", false); }
		});

		$('#droite').append(formTextZone);
		$('#droite').append(helpMessages('aideTextZone'));
		$('#idInput').focus();
	});


	/*Evènement "clic" pour le formulaire d'ajout du submit dans le div gauche.

	  Le bouton permettant d'afficher le formulaire d'ajout du submit ne s'active
	  uniquement sur la page web que si on a au moins un input type texte généré dans le formulaire. */
	  $('#droite > :button:eq(2)').click(function() {
	  	var ButtonToReEnable = null;

	  	$(this).prop("disabled", true);
	  	$(this).css("opacity", "0.3");

	  	var formButton = createForms("addButton", "idButton", "Texte du bouton :");

	  	if($('#droite > :button:eq(1)').is(':disabled')) {
			ButtonToReEnable = $('#droite > :button:eq(0)');
			$('#droite > :button:eq(0)').prop("disabled", true);

		} else {
			console.log("Condition 2");
			if($('#droite > :button:eq(0)').is(':disabled')) {
				ButtonToReEnable = $('#droite > :button:eq(1)');
				$('#droite > :button:eq(1)').prop("disabled", true);
			} else {
				ButtonToReEnable = null;
			}
		}

	  	formButton.submit(function(event) {
	  		event.preventDefault();	

	  		if($('#formulaire > :input').length > 0) {
	  			buttonInserted = true;
	  			$('#formulaire').append($('<button type="submit"></button>').text($('#idButton').val()));
	  		} else {
	  			console.error("Aucun input dans le formulaire !");
	  			$('#droite > :button:eq(2)').prop("disabled", false);
	  		}

	  		if(ButtonToReEnable !== null) reEnableButton(ButtonToReEnable);
	  		removeForms(formButton);
	  	});

	  	formButton.on('reset', function() {
			removeForms(formButton);
			$('#droite > :button:eq(2)').prop("disabled", false);
			$('#droite > :button:eq(2)').css("opacity", "1");

			if(ButtonToReEnable !== null) reEnableButton(ButtonToReEnable);
		});

	  	$('#droite').append(formButton);
	  	$('#droite').append(helpMessages('aideBouton'));
	  	$('#idButton').focus();
	  });
});