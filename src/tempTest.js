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
	//removeIf(production)
	api._test = {};
	api._test.privateFunction = privateFunction;
	api._test.publicFunction = publicFunction;
	//endRemoveIf(production)
	console.log('test:'+api._test.privateFunction());

    return api;
}();


