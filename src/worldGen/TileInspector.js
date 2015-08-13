
module.exports = function() {
	'use strict';
	var data = require('./Data.js');
	var tiles = data.get('tiles');

	function isTileEmpty(tile){
		return tile.tile == tiles.empty;
	}
	function getNewEmptyTile(){
		return {tile:tiles.empty};
	}

	var api = {
		isTileEmpty:isTileEmpty,
		getNewEmptyTile:getNewEmptyTile
	};
	//removeIf(production)
	api._test = {};
	api._test.isTileEmpty = isTileEmpty;
	api._test.getNewEmptyTile = getNewEmptyTile;
	//endRemoveIf(production)

	return api;
}();



