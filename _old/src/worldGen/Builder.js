module.exports = function() {
	'use strict';
	var map = require('./Map');

	function get(){
		return map.get();
	}

	function add(entity){
		
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


