
module.exports = function() {
	'use strict';
	var data = require('./Data.js');
	var tiles = data.get('tiles');

	function getNewEmptyTile(){
		return {tile:tiles.empty};
	}

	var api = {
		getNewEmptyTile:getNewEmptyTile
	};
	//removeIf(production)
	api._test = {};
	api._test.getNewEmptyTile = getNewEmptyTile;
	//endRemoveIf(production)

	return api;
}();



