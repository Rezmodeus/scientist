module.exports = function() {
	'use strict';
	var map = [];
	var tileInspector = require('./TileInspector.js');
	var tileFactory = require('./TileFactory.js');
	var random = require('./Random.js').getUniqueFunction('Map');

	function add(mapPart){
		addAtFreePosition(mapPart);
	}

	function get(){
		return map;
	}

	function set(newMap){
		map = newMap;
	}

	// private functions
	function addAtFreePosition(mapPart){
		var sizeXY = {x:mapPart[0].length,y:mapPart.length};
		var pointXY = findFreePosition(sizeXY);
		addAtPosition(mapPart,pointXY);
	}

	function findFreePosition(sizeXY){
		var pointXY = {x:0,y:0};
		var angle = getRandomAngle();
		while(!isPositionFree(pointXY,sizeXY)){
			movePointByAngle(pointXY,angle);
		}
		return pointXY;
	}

	function getRandomAngle(){
		return random()*(Math.PI*2);
	}
	function isPositionFree(pointXY,sizeXY){
		var flooredPoint = getFloorPoint(pointXY);
		var relativePoint = {x:0,y:0};
		var area = sizeXY.x* sizeXY.y;
		for(var y=0;y<sizeXY.y;y++){
			for(var x=0;x<sizeXY.x;x++){
				relativePoint.x = x + flooredPoint.x;
				relativePoint.y = y + flooredPoint.y;
				if(isInBounds(relativePoint)){
					if(tileInspector.isTileEmpty(map[relativePoint.y][relativePoint.x])){
						area--;
					}else{
						break;
					}
				}else{
					area--;
				}
			}
		}
		return area==0;
	}
	function isInBounds(pointXY){
		return map.length>0 && pointXY.x<map[0].length && pointXY.x>=0 && pointXY.y<map.length && pointXY.y>=0;
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

	function addAtPosition(mapPart,pointXY){
		expand(mapPart,pointXY);	
		copyToPosition(mapPart,pointXY);
	}

	function expand(mapPart,pointXY){
		var flooredPoint = getFloorPoint(pointXY);
		var yDiff = (flooredPoint.y + mapPart.length) - map.length;
		var xDiff = (flooredPoint.x + mapPart[0].length) - getMapSizeX();

		if(flooredPoint.y<0){
			addTopRow(Math.abs(flooredPoint.y));
		}

		if(yDiff>0){
			addBottomRow(yDiff);
		}

		if(flooredPoint.x<0){
			addLeftColumn(Math.abs(flooredPoint.x));
		}

		if(xDiff>0){
			addRightColumn(xDiff);
		}
	}

	function addTopRow(nbrOfRows){
		for(var i = 0;i<nbrOfRows;i++){
			map.unshift(getNewEmptyRow());
		}
	}

	function addBottomRow(nbrOfRows){
		for(var i = 0;i<nbrOfRows;i++){
			map.push(getNewEmptyRow());
		}

	}

	function getNewEmptyRow(){
		var mapSizeX = getMapSizeX();
		var emptyRow = [];
		for(var i = 0;i<mapSizeX;i++){
			emptyRow.push(tileFactory.getNewEmptyTile());
		}
		return emptyRow;
	}

	function getMapSizeX(){
		if(map.length==0){
			return 0;
		}else{
			return map[0].length;
		}
	}

	function addLeftColumn(nbrOfColumns){
		for(var i = 0;i<map.length;i++){
			for(var j = 0;j<nbrOfColumns;j++){
				map[i].unshift(tileFactory.getNewEmptyTile());
			}
		}
	}
	function addRightColumn(nbrOfColumns){
		for(var i = 0;i<map.length;i++){
			for(var j = 0;j<nbrOfColumns;j++){
				map[i].push(tileFactory.getNewEmptyTile());
			}
		}
	}

	function copyToPosition(mapPart,pointXY){
		var flooredPoint = getFloorPoint(pointXY);

		if(flooredPoint.x < 0){
			flooredPoint.x = 0;
		}	
		if(flooredPoint.y < 0){
			flooredPoint.y = 0;
		}	
		for(var y=0;y<mapPart.length;y++){
			for(var x=0;x<mapPart[y].length;x++){
				map[flooredPoint.y+y][flooredPoint.x+x] = mapPart[y][x];
			}
		}
	}

	var api = {
		add:add,
		get:get,
		set:set
	};
	//removeIf(production)

	api._test = {};
	api._test.add = add;
	api._test.get = get;
	api._test.set = set;
	api._test.addAtFreePosition = addAtFreePosition;
	api._test.findFreePosition = findFreePosition;
	api._test.getRandomAngle = getRandomAngle;
	api._test.isPositionFree = isPositionFree;
	api._test.isInBounds = isInBounds;
	api._test.movePointByAngle = movePointByAngle;
	api._test.getFloorPoint = getFloorPoint;
	api._test.addAtPosition = addAtPosition;
	api._test.expand = expand;
	api._test.addTopRow = addTopRow;
	api._test.addBottomRow = addBottomRow;
	api._test.getNewEmptyRow = getNewEmptyRow;
	api._test.getMapSizeX = getMapSizeX;
	api._test.addLeftColumn = addLeftColumn;
	api._test.addRightColumn = addRightColumn;
	api._test.copyToPosition = copyToPosition;
	//endRemoveIf(production)

    return api;
}();


