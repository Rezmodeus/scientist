
global.seeder = require('../src/worldGen/Seeder.js');
var chai = require('chai');
var expect = chai.expect;

describe('seeder',function(){

	var seeder;
	
	
	beforeEach(function(){
		seeder = global.seeder._test;
	});

	it('object', function(){
		expect(seeder).to.be.ok;
	});

	it('getNextFunction values', function(){
		var f1 = seeder.getUniqueFunction()
		var f2 = seeder.getUniqueFunction()
		expect(f1()).to.not.equal(f2());
	});

	it('init', function(){
		seeder.init(3);
		var f1 = seeder.getUniqueFunction()
		seeder.init(3);
		var f2 = seeder.getUniqueFunction()
		expect(f1()).to.equal(f2());
		expect(f1()).to.equal(f2());
	});


});
