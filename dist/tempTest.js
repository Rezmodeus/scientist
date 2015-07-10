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
	console.log('test:'+api._test.privateFunction());

    return api;
}();


