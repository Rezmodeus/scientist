
var chai = require('chai');
var expect = chai.expect;

xdescribe('test Builder',function(){
	var builder;
	before(function(){
		builder = require('../src/worldGen/Builder.js')._test;
	});

	it('test init', function(){
		expect(builder.get()).to.be.empty;
	});

	it('test first add building',function(){

		var building = {"buildings": {
			"id":"BUILDING_000",
			"pos":"",
			"type":""
		}};

		builder.add(building);
		expect(builder.get()).not.to.be.empty;
	});

});
