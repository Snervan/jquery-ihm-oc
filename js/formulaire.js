/**************************************************************
*	IHM Activity (First activity in part 2 on OC)             *
*															  *
*	@author : Snervan										  *
*	@project : IHM Activity                                   *
*	@description : generate our own form with IHM buttons     *
*				   on the right.                              *
*															  *
*                                                             *
***************************************************************/


$(function() {

	var formGauche = $('<form id="formulaire"></form>');
	$('#gauche').prepend(formGauche);

	//On empêche la soumission du formulaire de gauche
	formGauche.submit(function(event) {
		event.preventDefault();
	});

	//On cache le bouton "bouton" et le révèle uniquement s'il y a au moins un input
	$('#droite > :button:eq(2)').hide();

	//Variables utilisées par dichotomie pour savoir si on a déjà mis l'input ou span
	//Pour éviter des doublons et autres erreurs d'insertions pour le formulaire
	var inputInserted = false; 
	var spanInserted = false;

	//Mode d'insertion différent si on ajoute le bouton au formulaire qu'on a généré
	var buttonInserted = false;

	//Evénement "clic" pour le bouton "Label"
	$(':button:first').click(function() {
		$('hr').remove();
		$('#textZone').remove();
		$('#labelNom').remove();
		$('#addButton').remove();

		var formNom = $("<form id='labelNom'></form>");
		formNom.append($("<label for='labelText'></label>").text('Nom du label '));
		formNom.append($("<input type='text' id='labelText'>"));
		formNom.append($("<br>"));
		formNom.append($("<input type='submit' value='OK'>"));

		formNom.submit(function(event) {
			event.preventDefault();

			var insertSpan = $("<span></span>").text($('#labelText').val() + " : ");
			var verifInput = $('#formulaire > :input[type="text"]').filter(':last');

			if(verifInput.length > 0 && inputInserted && !spanInserted) {

				spanInserted = !spanInserted ;

				verifInput.before(insertSpan);

				//Ligne complété, on réinitialise
				if(spanInserted === inputInserted) {
					inputInserted = false ;
					spanInserted = false ;
				}

			} else if(!spanInserted  && !inputInserted) {

				if(buttonInserted) {
					$('#formulaire > :input[type="submit"]').before($("<span></span>").text($('#labelText').val() + " : "));
				} else {
					$('#formulaire').append($("<span></span>").text($('#labelText').val() + " : "));
				}
				
				spanInserted = !spanInserted ;

			} else {
				//Si span de la ligne déjà inséré, on affiche une erreur demandant d'ajouter sa zone de texte
				var errorMessage = $("<p id='error'></p>").text("Veuillez ajouter une zone de texte !");
				$('#droite').append(errorMessage);

				setTimeout(function(){ errorMessage.remove(); }, 2000);
			}
			
			
			formNom.remove();
			$('hr').remove();
		});

		$('#droite').append($('<hr>'));
		$('#droite').append(formNom);
		$('#labelText').focus();
	});

	//Evènement "clic" pour le bouton "Zone de texte"
	$(':button:eq(1)').click(function() {
		$('hr').remove();
		$('#labelNom').remove();
		$('#textZone').remove();
		$('#addButton').remove();

		var formTextZone = $("<form id='textZone'></form>");
		formTextZone.append($("<label for='idInput'></label>").text('id de la zone de texte '));
		formTextZone.append($("<input type='text' id='idInput'>"));
		formTextZone.append($("<br>"));
		formTextZone.append($("<input type='submit' value='OK'>"));

		formTextZone.submit(function(event) {
			event.preventDefault();

			var inputText = $("<input type='text'>");
			inputText.attr('id', $('#idInput').val());
			inputText.attr('name', $('#idInput').val());

			if(!inputInserted) {
				if(buttonInserted) {
					$('#formulaire > :input[type="submit"]').before(inputText);
					$('#formulaire > :input[type="submit"]').before($('<br>'));
				} else {
					$('#formulaire').append(inputText);
					$('#formulaire').append($('<br>'));
				}	
			} else {
				var errorMessage = $("<p id='error'></p>").text("Veuillez ajouter le label associé à la zone de texte !");
				$('#droite').append(errorMessage);

				setTimeout(function(){ errorMessage.remove(); }, 2000);
			}


			/* Système de switch permettant de savoir si l'utilisateur a complété une ligne
			ou si l'utilisateur a inséré déjà un span ou non sur la ligne actuelle */
			if(spanInserted && inputInserted) {
				inputInserted = !inputInserted ;
				spanInserted = !spanInserted;
			} else if(!inputInserted && !spanInserted) {
				inputInserted = true;
				spanInserted = false;
				
			} else if(!inputInserted && spanInserted) {
				inputInserted = false;
				spanInserted = false;
			}
			
			//Input inséré, on montre le bouton "bouton" et on enlève le formulaire d'ajout d'input
			$('#droite > :button:eq(2)').show();
			formTextZone.remove();
			$('hr').remove();
		});

		$('#droite').append($('<hr>'));
		$('#droite').append(formTextZone);
		$('#idInput').focus();
	});


	/*Evènement "clic" pour le formulaire d'ajout du button.

	  Le bouton permettant d'afficher le formulaire d'ajout du button ne se montre 
	  uniquement sur la page web que si on a au moins un input généré dans le formulaire. */

	  $('#droite > :button:eq(2)').click(function() {
	  	$('hr').remove();
	  	$('#labelNom').remove();
	  	$('#textZone').remove();
	  	$('#addButton').remove();

	  	var formButton = $("<form id='addButton'></form>");
	  	formButton.append($("<label for='idButton'></label>").text('Texte du bouton :  '));
	  	formButton.append($("<input type='text' id='idButton'>"));
	  	formButton.append($("<br>"));
	  	formButton.append($("<input type='submit' value='OK'>"));

	  	formButton.submit(function(event) {
	  		event.preventDefault();

	  		if($('#formulaire > :input').length > 0) {
	  			buttonInserted = true;
	  			$('#formulaire').append($('<button type="submit"></button>').text($('#idButton').val()));
	  			$('#droite > :button:eq(2)').remove();
	  			$('#addButton').remove();
	  		} else {
	  			console.error("Aucun input dans le formulaire !");
	  		}
	  	});


	  	$('#droite').append($('<hr>'));
	  	$('#droite').append(formButton);
	  	$('#idButton').focus();
	  });
	});