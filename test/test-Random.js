
var chai = require('chai');
var expect = chai.expect;

var settings = require('./settings');
var moduleName = settings.getSrcPath()+'Random.js';

describe('Random',function(){

	var random;
	
	
	beforeEach(function(){
		random = require(moduleName)._test;
	});

	it('object', function(){
		expect(random).to.be.ok;
	});

	it('should return that are unique', function(){
		var f1 = random.getUniqueFunction('testA');
		var f2 = random.getUniqueFunction('testB');
		expect(f1()).to.not.equal(f2());
	});

	it('should have same order', function(){
		var f1 = random.getUniqueFunction('test');
		var f2 = random.getUniqueFunction('test');
		expect(f1()).to.equal(f2());
		expect(f1()).to.equal(f2());
	});

	it('should use world seed',function(){
		random.setWorldSeed('a');
		var f1 = random.getUniqueFunction('test');
		random.setWorldSeed('b');
		var f2 = random.getUniqueFunction('test');
		expect(f1()).to.not.equal(f2());
	});

	it('should keep world seed',function(){
		var random2 = require(moduleName)._test;
		random.setWorldSeed('c');
		random2.setWorldSeed('x');
		var f1 = random.getUniqueFunction('test');
		var f2 = random2.getUniqueFunction('test');
		expect(f1()).to.equal(f2());
	});


});
