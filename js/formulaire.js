/**************************************************************
*   IHM Activity (First activity in part 2 on OC)             *
*                                                             *
*   @author : Snervan                                         *
*   @project : IHM Activity                                   *
*   @description : generate our own form with IHM buttons     *
*                  on the right.                              *
*                                                             *
*                                                             *
***************************************************************/

$(function() {
	var formGauche = $('<form id="formulaire"></form>');
	$('#gauche').prepend(formGauche);

	//On empêche la soumission du formulaire de gauche
	formGauche.submit(function(event) {
		event.preventDefault();
	});

	//On désactive le "bouton" et l'active uniquement s'il y a au moins un input
	$('#droite > :button:eq(2)').prop("disabled", true);

	//On désactive le bouton "Zone de texte" pour des raisons de cohérence
	$('#droite > :button:eq(0)').prop("disabled", false);
	$('#droite > :button:eq(1)').prop("disabled", true);	

	//Mode d'insertion différent du span et de l'input si on a ajouté le bouton au formulaire qu'on a généré
	var buttonInserted = false;

	//Evénement "clic" pour le bouton "Label"
	$(':button:first').click(function() {
		$('hr').remove();
		$('#textZone').remove();
		$('#labelNom').remove();
		$('#addButton').remove();

		var formLabel = $("<form id='labelNom'></form>");
		formLabel.append($("<label for='labelText'></label>").text('Nom du label '));
		formLabel.append($("<input type='text' id='labelText'>"));
		formLabel.append($("<br>"));
		formLabel.append($("<input type='submit' value='OK'>"));

		$('#droite > :button:eq(0)').prop("disabled", false);
		$('#droite > :button:eq(1)').prop("disabled", true);

		formLabel.submit(function(event) {
			event.preventDefault();

			var insertSpan = $("<span></span>").text($('#labelText').val() + " : ");

			if(buttonInserted) {
				$('#formulaire > :input[type="submit"]').before($("<span></span>").text($('#labelText').val() + " : "));
			} else {
				$('#formulaire').append($("<span></span>").text($('#labelText').val() + " : "));
			}

			$('#droite > :button:eq(0)').prop("disabled", true);
			$('#droite > :button:eq(1)').prop("disabled", false);
			
			formLabel.remove();
			$('hr').remove();
		});

		$('#droite').append($('<hr>')).append(formLabel);
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


			if(buttonInserted) {
				$('#formulaire > :input[type="submit"]').before(inputText);
				$('#formulaire > :input[type="submit"]').before($('<br>'));
			} else {
				$('#formulaire').append(inputText);
				$('#formulaire').append($('<br>'));
			}	

			$('#droite > :button:eq(0)').prop("disabled", false);
			$('#droite > :button:eq(1)').prop("disabled", true);	

			//Input inséré, on active le bouton "bouton" et on enlève le formulaire d'ajout d'input
			$('#droite > :button:eq(2)').prop("disabled", false);
			formTextZone.remove();
			$('hr').remove();
		});

		$('#droite').append($('<hr>')).append(formTextZone);
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


	  	$('#droite').append($('<hr>')).append(formButton);
	  	$('#idButton').focus();
	  });
});