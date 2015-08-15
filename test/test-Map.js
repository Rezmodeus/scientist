
var proxyquire = require('proxyquire');
var chai = require('chai');
var expect = chai.expect;

var settings = require('./settings');
var moduleName = settings.getSrcPath()+'map.js';

describe('Map',function(){

	it('module creation', function(){
		var map = require(moduleName)._test;
		expect(map).to.be.ok;
	});
	xit('independence', function(){
		var map1 = require(moduleName)._test;
		var map2 = require(moduleName)._test;

		expect(map1.get().length).to.equal(0);
		map1.add([[1,1],[1,1]]);
		expect(map1.get().length).to.equal(2);

		expect(map2.get().length).to.equal(0);
	});

	describe('copyToPosition',function(){
		var startData;
		var insertData = [[1,1],[1,1]];
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

	it('addRightColumn',function(){
		var dataStub = {
			getNewEmptyTile:function(){
				return 1;
			}
		}

		var map = proxyquire(moduleName,{'./TileFactory.js':dataStub})._test;
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

	it('addLeftColumn',function(){
		var dataStub = {
			getNewEmptyTile:function(){
				return 1;
			}
		}

		var map = proxyquire(moduleName,{'./TileFactory.js':dataStub})._test;
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

	it('getMapSizeX',function(){
		var map = require(moduleName)._test;
		expect(map.getMapSizeX()).to.equal(0);
		map.set([]);
		expect(map.getMapSizeX()).to.equal(0);
	
		map.set([[0,0,0],[0,0,0]]);
		expect(map.getMapSizeX()).to.equal(3);
	
	});

	it('getFloorPoint',function(){
		var map = require(moduleName)._test;
		var point = map.getFloorPoint({x:1.1,y:0.9});
		expect(point.x).to.equal(1);
		expect(point.y).to.equal(0);
	
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

	xit('isTileEmpty', function(){
		var dataStub = {
			get:function(dummy){
				return {
					empty:9
				}
			}
		}

		var tileInspector = proxyquire(settings.getSrcPath()+'TileInspector.js',{'./Data.js':dataStub})._test;
		expect(tileInspector.isTileEmpty({tile:9})).to.equal(true);
		expect(tileInspector.isTileEmpty({tile:0})).to.equal(false);
	});

});
