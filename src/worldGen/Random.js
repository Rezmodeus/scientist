
module.exports = function() {
	'use strict';

	var rand = global.seeder.getNextFunction();
	function getNext(){
		return rand();
	}

	var api = {
		getNext:getNext
	};
	//removeIf(production)
	api._test = {};
	api._test.getNext = getNext;
	//endRemoveIf(production)
 
	return api;
}();



