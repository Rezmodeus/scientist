
module.exports = function() {
	'use strict';

	var worldSeed = '';
	var seedRandom = require('seed-random');
	function getUniqueFunction(seed){
		return seedRandom(worldSeed+seed);
	}
	function setWorldSeed(seed){
		worldSeed = seed;
	}

	var api = {
		getUniqueFunction:getUniqueFunction,
		setWorldSeed:setWorldSeed
	};
	//removeIf(production)
	api._test = {};
	api._test.getUniqueFunction = getUniqueFunction;
	api._test.setWorldSeed = setWorldSeed;
	//endRemoveIf(production)

	return api;
}();



