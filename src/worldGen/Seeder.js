
module.exports = function() {
	'use strict';

	var originalSeed = 0;
	var numberOfSeeders = 0;
	var seedRandom = require('seed-random');
	function getUniqueFunction(){
		var tempSeeder = seedRandom(originalSeed+numberOfSeeders);
		numberOfSeeders++;
		return tempSeeder;
	}
	function init(seed){
		originalSeed = seed;
		numberOfSeeders = 0;
	}

	var api = {
		getUniqueFunction:getUniqueFunction,
		init:init
	};
	//removeIf(production)
	api._test = {};
	api._test.getUniqueFunction = getUniqueFunction;
	api._test.init = init;
	//endRemoveIf(production)

	return api;
}();



