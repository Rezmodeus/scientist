module.exports = function() {
	'use strict';
	var map = [];
	var tileInspector = require('TileInspector');

	function add(mapPart){
		addAtFreePosition(mapPart);
	}

	// private functions
	function addAtPosition(mapPart,pointXY){
		// check for out of bounds then expand
		// copy to map
	}
	

	function expand(){
	}

	function addAtFreePosition(mapPart){
		var sizeXY = {x:mapPart[0].length,y:mapPart.length};
		var pointXY = findFreePosition(sizeXY);
		addAtPosition(mapPart,pointXY);
	}

	function findFreePosition(sizeXY){
		var pointXY = {x:0,y:0};
		var dir = getRandomAngle();
		while(!isPositionFree(pointXY,sizeXY)){
			movePointByAngle(pointXY,dir);
		}
		return pointXY;
	}

	function getRandomAngle(){

	}
	function isPositionFree(pointXY,sizeXY){
		for(var y=0;y<sizeXY.y;y++){
			for(var x=0;x<sizeXY.x;x++){
			}
		}
	}

	function movePointByAngle(pointXY,angle){
		var xAdd = Math.sin(angle);
		var yAdd = Math.cos(angle);
		var previousPoint = getFloorPoint(pointXY);
		pointXY.x += xAdd;
		pointXY.y += yAdd;
		var newPoint = getFloorPoint(pointXY);
		if(newPoint.x==previousPoint.x && newPoint.y==previousPoint.y){
			pointXY.x += xAdd/2;
			pointXY.y += yAdd/2;
		}
	}
	function getFloorPoint(pointXY){
		return {x:Math.floor(pointXY.x),y:Math.floor(pointXY.y)};
	}


	var api = {
		add:add
	};
	//removeIf(production)
	api._test = {};
	api._test.= ;
	//endRemoveIf(production)

    return api;
}();


