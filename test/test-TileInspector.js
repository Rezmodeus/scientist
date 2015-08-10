
var proxyquire = require('proxyquire');
var chai = require('chai');
var expect = chai.expect;

describe('TileInspector',function(){

	it('module creation', function(){
		var tileInspector = require('../src/worldGen/TileInspector.js')._test;
		expect(tileInspector).to.be.ok;
	});
	it('isTileEmpty', function(){
		var dataStub = {
			get:function(dummy){
				return {
					empty:9
				}
			}
		}

		var tileInspector = proxyquire('../src/worldGen/TileInspector.js',{'./Data.js':dataStub})._test;
		expect(tileInspector.isTileEmpty({tile:9})).to.equal(true);
		expect(tileInspector.isTileEmpty({tile:0})).to.equal(false);
	});

});
