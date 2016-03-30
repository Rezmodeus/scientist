
module.exports = function() {
	'use strict';

	var fs = require('fs');

	function get(fileName){
		var path = './json/';
		return JSON.parse(fs.readFileSync(path+fileName+'.json'));
	}

	var api = {
		get:get
	};
	//removeIf(production)
	api._test = {};
	api._test.get = get;
	//endRemoveIf(production)

	return api;
}();



