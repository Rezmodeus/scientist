
var proxyquire = require('proxyquire');
var chai = require('chai');
var expect = chai.expect;

var settings = require('./settings');
var moduleName = settings.getSrcPath()+'map.js';

describe('Map',function(){
	var tileInspectorMock = {
		isTileEmpty:function(tile){
			return tile<=1;
		}
	}

	var tileFactoryMock = {
		getNewEmptyTile:function(){
			return 1;
		}
	}
	function compareData(expected,actual){
		for(var y=0;y<expected.length;y++){
			for(var x=0;x<expected[0].length;x++){
				if(actual[y][x] != expected[y][x]){
					return false;
				}

			}
		}
		return true;
	}

	it('module creation', function(){
		var map = require(moduleName)._test;
		expect(map).to.be.ok;
	});

	it('add',function(){
		function countTwos(a){
			var count = 0;
			for(var y=0;y<a.length;y++){
				for(var x=0;x<a[0].length;x++){
					if(a[y][x] == 2){
						count++;
					}

				}
			}
			return count;
			
		}
		map = proxyquire(moduleName,{
		'./TileFactory.js':tileFactoryMock,
		'./TileInspector.js':tileInspectorMock})._test;
		map.set[[]];

		var mapPart1 = [[2,2],[2,2],[2,2]];
		var sum1 = mapPart1.length*mapPart1[0].length;

		var mapPart2 = [[2,2,2,2],[2,2,2,2]];
		var sum2 = mapPart2.length*mapPart2[0].length;

		map.add(mapPart1);
		var m = map.get();
		expect(countTwos(m)).to.equal(sum1);

		map.add(mapPart2);
		m = map.get();
		expect(countTwos(m)).to.equal(sum1+sum2);
	});	
	it('get and get',function(){
		var map = require(moduleName)._test;
		map.set([0]);
		expect(map.get().length).to.equal(1);

	});

	it('addAtFreePosition',function(){
		map = proxyquire(moduleName,{
		'./TileFactory.js':tileFactoryMock,
		'./TileInspector.js':tileInspectorMock})._test;
		map.set([]);
		map.addAtFreePosition([[2,2,2],[2,2,2]]);
		var m = map.get();
		expect(m.length).to.equal(2);
		expect(m[0].length).to.equal(3);
	
	
	});
	describe('findFreePosition',function(){
		var randomMock = {
			randFuncNr:0,
			getUniqueFunction:function(){
				if(this.randFuncNr==0){
					return function(){return 0};
				}else{
					return function(){return 0.5};
				}
			}
		
		}
		var map; 
		beforeEach(function(){
			map = proxyquire(moduleName,{
			'./Random.js':randomMock,
			'./TileFactory.js':tileFactoryMock,
			'./TileInspector.js':tileInspectorMock})._test;
			map.set([[2,2],[2,2]]);
		});
		afterEach(function(){
			randomMock.randFuncNr++;
		});
		it('search down',function(){
			var p = map.getFloorPoint(map.findFreePosition({x:2,y:2}));
			expect(p.x).to.equal(0);
			expect(p.y).to.equal(2);
		});
		it('search up',function(){
			var p = map.getFloorPoint(map.findFreePosition({x:2,y:2}));
			expect(p.x).to.equal(0);
			expect(p.y).to.equal(-2);

		});

	
	});

	it('getRandomAngle',function(){
		var map = require(moduleName)._test;
		expect(map.getRandomAngle()).to.be.ok;
	});

	describe('isPositionFree',function(){
		var map;
		beforeEach(function(){
			map = proxyquire(moduleName,{'./TileInspector.js':tileInspectorMock})._test;
		});
		it('empty map',function(){
			map.set([[0,0],[0,0]]);
			expect(map.isPositionFree({x:0,y:0},{x:1,y:1})).to.equal(true);
			expect(map.isPositionFree({x:0,y:0},{x:2,y:2})).to.equal(true);
			expect(map.isPositionFree({x:-1,y:-1},{x:2,y:2})).to.equal(true);
		});

		it('partially filled map',function(){
			map.set([[0,2],[2,2]]);
			expect(map.isPositionFree({x:0,y:0},{x:2,y:1})).to.equal(false);
			expect(map.isPositionFree({x:0,y:0},{x:1,y:1})).to.equal(true);
			expect(map.isPositionFree({x:-1,y:-1},{x:2,y:2})).to.equal(true);
			expect(map.isPositionFree({x:2,y:2},{x:2,y:2})).to.equal(true);

		});

	
	
	});
	it('isInBounds',function(){
		var map = require(moduleName)._test;
		map.set([]);
		expect(map.isInBounds({x:0,y:0})).to.equal(false);
		
		map.set([[0,0],[0,0]]);	
		expect(map.isInBounds({x:0,y:0})).to.equal(true);
		expect(map.isInBounds({x:-1,y:0})).to.equal(false);
		expect(map.isInBounds({x:0,y:-1})).to.equal(false);
		expect(map.isInBounds({x:2,y:0})).to.equal(false);
		expect(map.isInBounds({x:0,y:2})).to.equal(false);

	});

	it('movePointByAngle',function(){
		var map = require(moduleName)._test;
		var startPoint = {x:0,y:0};
		var point = {x:0,y:0};
		var angle = 0;
		var angles = 8
		var angleAdd = (Math.PI*2)/angles; 

		for(var i=0;i<angles;i++){
			point = {x:startPoint.x,y:startPoint.y};
			map.movePointByAngle(point,angle);
			point = map.getFloorPoint(point);
			expect(point.x!=startPoint.x || point.y!=startPoint.y).to.equal(true);
			angle += angleAdd;
		}
	
	});

	it('getFloorPoint',function(){
		var map = require(moduleName)._test;
		var point = map.getFloorPoint({x:1.1,y:0.9});
		expect(point.x).to.equal(1);
		expect(point.y).to.equal(0);
	
	});

	describe('addAtPosition',function(){
		var map = proxyquire(moduleName,{'./TileFactory.js':tileFactoryMock})._test;

		beforeEach(function(){
			map.set([[0,0],[0,0]]);	
		});

		it('perfect fit',function(){
			map.addAtPosition([[2,2],[2,2]],{x:0,y:0});
			var m = map.get();
			var expectedData = [[2,2],[2,2]];
			expect(compareData(expectedData,m)).to.equal(true);
		});

		it('negative pos overlap',function(){
			map.addAtPosition([[2,2],[2,2]],{x:-1,y:-1});
			var m = map.get();
			var expectedData = [[2,2,1],[2,2,0],[1,0,0]];
			expect(compareData(expectedData,m)).to.equal(true);
		});

		it('outside fit',function(){
			map.addAtPosition([[2,2],[2,2]],{x:2,y:2});
			var m = map.get();
			var expectedData = [[0,0,1,1],[0,0,1,1],[1,1,2,2],[1,1,2,2]];
			expect(compareData(expectedData,m)).to.equal(true);
		});
	});
	describe('expand',function(){
		var map = proxyquire(moduleName,{'./TileFactory.js':tileFactoryMock})._test;
		beforeEach(function(){
			map.set([[0,0,0],[0,0,0],[0,0,0]]);	
		});

		it('no expand',function(){
			map.expand([2],{x:2,y:2});
			var m = map.get();
			expect(m.length).to.equal(3);
			expect(m[0].length).to.equal(3);
		});
		it('expand all over',function(){
			map.expand([[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]],{x:-1,y:-1});
			var m = map.get();
			expect(m.length).to.equal(5);
			expect(m[0].length).to.equal(5);
			var expectedData = [[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1]];
			expect(compareData(expectedData,m)).to.equal(true);
		});
	});

	it('addTopRow',function(){
		var map = proxyquire(moduleName,{'./TileFactory.js':tileFactoryMock})._test;
		map.set([[0,0,0],[0,0,0]]);
		map.addTopRow(1);
		var m = map.get();
		expect(m.length).to.equal(3);
		expect(m[0].length).to.equal(3);
		expect(m[0][0]).to.equal(1);

		map.addTopRow(2);
		expect(m.length).to.equal(5);
	});
	
	it('addBottomRow',function(){
		var map = proxyquire(moduleName,{'./TileFactory.js':tileFactoryMock})._test;
		map.set([[0,0,0],[0,0,0]]);
		map.addBottomRow(1);
		var m = map.get();
		expect(m.length).to.equal(3);
		expect(m[2].length).to.equal(3);
		expect(m[2][0]).to.equal(1);

		map.addBottomRow(2);
		expect(m.length).to.equal(5);
	});

	it('getNewEmptyRow',function(){
		var map = require(moduleName)._test;
		map.set([[0,0,0],[0,0,0]]);
		var row = map.getNewEmptyRow();
		expect(row.length).to.equal(map.get()[0].length);
	});

	it('getMapSizeX',function(){
		var map = require(moduleName)._test;
		map.set([]);
		expect(map.getMapSizeX()).to.equal(0);
		map.set([]);
		expect(map.getMapSizeX()).to.equal(0);
	
		map.set([[0,0,0],[0,0,0]]);
		expect(map.getMapSizeX()).to.equal(3);
	
	});

	it('addLeftColumn',function(){
		var map = proxyquire(moduleName,{'./TileFactory.js':tileFactoryMock})._test;
		startData = [[0,0,0],[0,0,0]];
		map.set(startData);
		map.addLeftColumn(1);
		var m = map.get();
		expect(m[0].length).to.equal(4);
		expect(m.length).to.equal(2);
		expect(m[0][0]).to.equal(1);

		map.addLeftColumn(2);
		m = map.get();
		expect(m[0].length).to.equal(6);
	});

	it('addRightColumn',function(){
		var map = proxyquire(moduleName,{'./TileFactory.js':tileFactoryMock})._test;
		startData = [[0,0,0],[0,0,0]];
		map.set(startData);
		map.addRightColumn(1);
		var m = map.get();
		expect(m[0].length).to.equal(4);
		expect(m.length).to.equal(2);
		expect(m[0][m[0].length-1]).to.equal(1);

		map.addRightColumn(2);
		m = map.get();
		expect(m[0].length).to.equal(6);
	});


	describe('copyToPosition',function(){
		var startData;
		var insertData = [[1,1],[1,1]];
		var map = require(moduleName)._test;
		beforeEach(function(){
			startData = [[0,0,0],[0,0,0],[0,0,0]];
			map.set(startData);

		});
		
		it('negative pos',function(){
			var expectedData = [[1,1,0],[1,1,0],[0,0,0]];
			map.copyToPosition(insertData,{x:-1,y:-1});
			expect(compareData(expectedData,map.get())).to.equal(true);
		});

		it('positive pos',function(){
			var expectedData = [[0,0,0],[0,1,1],[0,1,1]];
			map.copyToPosition(insertData,{x:1,y:1});
			expect(compareData(expectedData,map.get())).to.equal(true);
		});
	
	});


});
