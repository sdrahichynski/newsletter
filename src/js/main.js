
var letterContainer = $('#newsletter');
var formContainer = $('#editContainer');
var enterData;
var currentData;
var jsonDirectory = "files/";

// get JSON
$.getJSON("files/default.json", function(data){
	// create DOM
	createNewsLetter(data);
});


function createNewsLetter(data){

	// parse JSON and create DOM elemmets
	// according to the types of the type of each element
	enterData = data;

	var length = data.length;
	var letterDomElement = $('<center style="font-family: Helvetica, Arial, sans-serif; font-size: 13px; margin: 0; padding: 0;">');
	var formDomElement = $('<div class="form-container">');


	for (var i = 0, length = data.length; i < length; i++) {

		var that = data[i];
		that.index = i;

		var newSection = $(Templates.create(that.type, that));
		var newForm = $(FormTemplates.create(that.type, that));

		letterDomElement.append(newSection);
		formDomElement.append(newForm);

	}

	letterContainer.append(letterDomElement);
	formContainer.append(formDomElement);

};


$(document).on('submit', '.editForm', function(e){
	e.preventDefault();
});


// forms:

$(document).on('keyup change', '.editForm', function(e){

	var thisForm = $(this);
	var index = thisForm.index();
	var item = enterData[index];

	thisForm.find('input, textarea').each(function(){
		var name = this.name;

		if ( !this.value ) return false;

		if ( thisForm.hasClass('events')) {

			var eventIndex = $(this).closest('.event-form-wrapper').data('index');
			if (eventIndex === undefined ) {
				item.data[name] = this.value;
			} else {
				item.data.events[eventIndex][name] = this.value;
			}

		} else
		if ( thisForm.hasClass('fotos')) {

			var eventIndex = $(this).closest('.foto-form-wrapper').data('index');
			if (eventIndex === undefined ) {
				item.data[name] = this.value;
			} else {
				item.data.fotos[eventIndex][name] = this.value;
			}

		} else {

			item.data[name] = this.value;

		}


		var newHTML = $(Templates.create(item.type, item)).html();

		$('.section-wrapper').eq(index).html(newHTML);

	});

});

// addEvent:
$(document).on('click', '#addEvent' ,function(e){
	e.preventDefault();
	alert('пока не работает');
});

$(document).on('click', '#addFoto', function(e){
	e.preventDefault();
	alert('пока не работает');
});





function cutScriptTag(string) {
	var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

	while ( SCRIPT_REGEX.test(string) ) {
	    string = string.replace(SCRIPT_REGEX, "");
	}

	return string;
};