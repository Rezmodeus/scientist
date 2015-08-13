
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
	it('independence', function(){
		var map1 = require(moduleName)._test;
		var map2 = require(moduleName)._test;

		expect(map1.get().length).to.equal(0);
		map1.add([[1,1],[1,1]]);
		expect(map1.get().length).to.equal(2);

		expect(map2.get().length).to.equal(0);
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
