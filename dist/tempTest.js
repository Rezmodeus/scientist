module.exports = function() {
	'use strict';

	function publicFunction(){
		return 'public';
	}
	function privateFunction(){
		return 'private';
	}


	var api = {
		publicFunction:publicFunction
	};
	return api;
}();


