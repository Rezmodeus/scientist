/**
 * Showing off how to display/hide parts of a SVG-image.
 */
window.functionExtractor = (function() {
    "use strict";

	function extract(){
		console.log('pressed');
		var elem = document.getElementById('before');
		var text = elem.value;
		var output = '';
		var outputTest = '';

		var rex = /^\s+function\s(\w+)/mg
		var re = new RegExp(rex);
		var a;
		while((a=re.exec(text))!==null){
			var temp = a[0].replace('function','').trim();
			output += "\tapi._test."+temp+" = "+temp+";\n";
			outputTest += "\tit(\'"+temp+"\',function(){});\n";
		}
		//console.log(output);
		elem = document.getElementById('after');
		elem.value = output+"\n"+outputTest;
	
	}

	var api = {
		extract:extract
	}

    return api;
})();
