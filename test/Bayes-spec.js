import should from 'should';
import expect from 'expect';
import Bayes from '../src/lib/Bayes';
import immutable from 'immutable';

describe('Bayes', ()=> {

	var b;
	beforeEach( ()=> {
		b = Bayes;
		b.reset();
	});


	it('should add and get', ()=> {
		const obj = {
			key0:'v0',
			key1:'v1',
			key2:'v2'
		};
		b.addData(obj);
		let ret = b.getDataRow(0);
		expect(ret.key0).toBe(obj.key0);

		b.addData(obj);
		ret = b.getDataRow(1);
		expect(ret.key0).toBe(obj.key0);
	});

	it('should be empty after add get test', ()=> {
		expect(b.getDataRow(1)).toBe(undefined);
	});

	it('should count values correctly', ()=> {
		b.addData({'key0': 'value0'});
		b.addData({'key1': 'value1'});
		expect(b.countValues({key0: 'value0'})).toEqual(1);
		expect(b.countValues({key1: 'value1'})).toEqual(1);

		expect(b.countValues({key0: 'value1'})).toEqual(0);

		expect(b.countValues({key0: 'value1', key1: 'value0'})).toEqual(0);
		expect(b.countValues({key0: 'value0', key1: 'value1'})).toEqual(0);
	});

	it('should calculate bayes correctly', ()=> {
		const columns = ["Day", "Outlook", "Temperature", "Humidity", "Wind", "PlayTennis"];

		const rows = [
			["D1", "Sunny", "Hot", "High", "Weak", "No"],
			["D2", "Sunny", "Hot", "High", "Strong", "No"],
			["D3", "Overcast", "Hot", "High", "Weak", "Yes"],
			["D4", "Rain", "Mild", "High", "Weak", "Yes"],
			["D5", "Rain", "Cool", "Normal", "Weak", "Yes"],
			["D6", "Rain", "Cool", "Normal", "Strong", "No"],
			["D7", "Overcast", "Cool", "Normal", "Strong", "Yes"],
			["D8", "Sunny", "Mild", "High", "Weak", "No"],
			["D9", "Sunny", "Cool", "Normal", "Weak", "Yes"],
			["D10", "Rain", "Mild", "Normal", "Weak", "Yes"],
			["D11", "Sunny", "Mild", "Normal", "Strong", "Yes"],
			["D12", "Overcast", "Mild", "High", "Strong", "Yes"],
			["D13", "Overcast", "Hot", "Normal", "Weak", "Yes"],
			["D14", "Rain", "Mild", "High", "Strong", "No"]];
		rows.forEach( row => {
			let index = 0;
			b.addData(row.reduce( (obj,val) => {
				obj[columns[index++]] = val;
				return obj;
			},{}));
		});
		expect(b.getDataRow(0).Day).toEqual("D1");

		expect(b.countPossibleValues("Outlook")).toBe(3);
		expect(b.countPossibleValues("Temperature")).toBe(3);
		expect(b.countPossibleValues("Humidity")).toBe(2);
		expect(b.countPossibleValues("Wind")).toBe(2);
		expect(b.countPossibleValues("PlayTennis")).toBe(2);
		expect(b.getPossibleValues("PlayTennis")[0]).toBe("No");
		expect(b.getPossibleValues("PlayTennis")[1]).toBe("Yes");

		expect(b.countValues({Outlook: "Overcast"})).toEqual(4);
		expect(b.countValues({Outlook: "Sunny", Temperature: "Hot"})).toEqual(2);
		const result = b.compute("PlayTennis", "Yes", {
			Outlook: "Sunny",
			Temperature: "Cool",
			Humidity: "High",
			Wind: "Strong"
		});
		expect(result[1]).toBeGreaterThan(result[0]);

	});

});




