
module.exports = function() {
	'use strict';

	function getName(){
		return '';
	}
	function getType(){
		return '';
	}

	var api = {
		getName:getName,
		getType:getType
	};
	//removeIf(production)
	api._test = {};
	api._test.getName = getName;
	api._test.getType = getType;
	//endRemoveIf(production)

    return api;
}();


