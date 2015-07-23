
module.exports = function() {
	'use strict';

	var originalSeed = 0;
	var numberOfSeeders = 0;
	var seedRandom = require('seed-random');
	var seed = seedRandom(originalSeed);
	function getNextFunction(){
		var tempSeeder = seed(numberOfSeeders);
		numberOfSeeders += '0';
		return tempSeeder;
	}

	var api = {
		getNextFunction:getNextFunction
	};
	//removeIf(production)
	api._test = {};
	api._test.getNextFunction = getNextFunction;
	//endRemoveIf(production)
 
	return api;
}();



