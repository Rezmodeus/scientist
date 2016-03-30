
var chai = require('chai');
var expect = chai.expect;

var settings = require('./settings');
var moduleName = settings.getSrcPath()+'Data.js';

describe('Data',function(){

	it('get', function(){
		var data = require(moduleName);
		var json = data.get('test');
		expect(json).to.be.ok;
		expect(json.test).to.equal(1);
	});

});
