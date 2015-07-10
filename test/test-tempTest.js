
var chai = require('chai');
var expect = chai.expect;

describe('testing private and public access',function(){

	it('test object', function(){
		var tempTest = require('../src/tempTest.js');
		expect(tempTest._test).to.be.ok;
	});

	it('functions', function(){
		var tempTest = require('../src/tempTest.js')._test;
		expect(tempTest.publicFunction()).to.equal('public');
		expect(tempTest.privateFunction()).to.equal('private');
	});

});
