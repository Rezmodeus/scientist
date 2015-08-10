
var chai = require('chai');
var expect = chai.expect;

describe('Data',function(){

	it('get', function(){
		var data = require('../src/worldGen/Data.js');
		var json = data.get('test');
		expect(json).to.be.ok;
		expect(json.test).to.equal(1);
	});

});
