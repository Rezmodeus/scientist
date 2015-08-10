
module.exports = function() {
	'use strict';
	var data = require('./Data.js');
	var tiles = data.get('tiles');

	function isTileEmpty(tile){
		return tile.tile == tiles.empty;
	}

	var api = {
		isTileEmpty:isTileEmpty
	};
	//removeIf(production)
	api._test = {};
	api._test.isTileEmpty = isTileEmpty;
	//endRemoveIf(production)

	return api;
}();



