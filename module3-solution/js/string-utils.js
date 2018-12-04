(function (global) {

	var stringUtils = {}
	// Return substitute of '{{propName}}'
	// with propValue in given 'string'
	stringUtils.insertProperty = function (string, propName, propValue) {
	  var propToReplace = "{{" + propName + "}}";
	  string = string
	    .replace(new RegExp(propToReplace, "g"), propValue);
	  return string;
	};

	// Expose utility to the global object
	global.$stringUtils = stringUtils;

})(window);

