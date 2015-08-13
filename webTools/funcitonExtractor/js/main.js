(function(){
    'use strict';

	var elem = document.getElementById('extract');
	if(typeof elem.onclick != "function") {
		elem.addEventListener("click",function(){
			window.functionExtractor.extract();
		});
	}

})();
