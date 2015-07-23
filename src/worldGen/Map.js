module.exports = function() {
	'use strict';
	var entities = [];
	var map = {}

	function get(){
		addAllToMapData();
		return map;
	}

	function addAllToMapData(){
		// add buildings
		// add items
		// add npcs
		// add playerstart
	}
	function add(entity){
	}

	function addNpc(){
	}

	var api = {
		get:get,
		add:add
	};
	//removeIf(production)
	api._test = {};
	api._test.get = get;
	api._test.add = add;
	//endRemoveIf(production)

    return api;
}();


