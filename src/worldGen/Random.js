
module.exports = function() {
	'use strict';

	var seedRandom = require('seed-random');
	function getUniqueFunction(seed){
		return seedRandom(seed);
	}

	var api = {
		getUniqueFunction:getUniqueFunction
	};
	//removeIf(production)
	api._test = {};
	api._test.getUniqueFunction = getUniqueFunction;
	//endRemoveIf(production)

	return api;
}();



