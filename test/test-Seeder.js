
global.seeder = require('../src/worldGen/Seeder.js')(0);
var chai = require('chai');
var expect = chai.expect;

describe('testing private and public access',function(){
	var seeder = global.seeder._test;

	it('test object', function(){
		expect(seeder).to.be.ok;
	});


});
