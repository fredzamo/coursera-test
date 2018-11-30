(function(window) {

  var printerNames = {};
  printerNames.property = "names";
  printerNames.print = function(jsonfile) {
  	
  	if(jsonfile.hasOwnProperty(this.property)) {
  		names = jsonfile[this.property];
	  
	  	for (var i = 0; i < names.length; i++) {

	  	  var firstLetter = names[i].toLowerCase().charAt(0);

	  	  if ('j' === firstLetter) {
	    	byeSpeaker.speak(names[i]);
	  	  } else {
	    	helloSpeaker.speak(names[i]);
	  	  }
		}
  	} else {
  		console.log("json file does not contains 'names' property");
  	}
  }

  window.printerNames = printerNames;

})(window);

