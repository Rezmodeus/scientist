import expect from 'expect';
import Tools from '../lib/Tools';

xdescribe('getSortedByTag',()=>{
	let picList1 = [];
	let picList2 = [];
	let result;

	beforeEach(()=>{

		picList1 = [
			{name:'a',tags:['bilar','båtar','flygplan']},
			{name:'b',tags:['flygplan','båtar']},
			{name:'c',tags:['flygplan']}
		];

		picList2 = [
			{name:'a',tags:['stolar','bord']},
			{name:'b',tags:['bord']},
			{name:'c',tags:['stolar']}
		];

	});


	it('should get data associated with tag',()=>{
		result = Tools.getSortedByTags(picList1,'motorcyklar');
		expect(result.length).toBe(0);

		result = Tools.getSortedByTags(picList1,'bilar');
		expect(result.length).toBe(1);

		result = Tools.getSortedByTags(picList1,'båtar');
		expect(result.length).toBe(2);

		result = Tools.getSortedByTags(picList1,'flygplan');
		expect(result.length).toBe(3);
	});

	it('should get data associated with multiple tags',()=>{
		result = Tools.getSortedByTags(picList2,'stolar bord');
		expect(result.length).toBe(3);
	});

	it('should work with caps',()=>{
		result = Tools.getSortedByTags(picList1,'FLYGPLAN');
		expect(result.length).toBe(3);
	});

	it('should return a full list if no tags',()=>{
		result = Tools.getSortedByTags(picList1,'');
		expect(result.length).toBe(picList1.length);
	});


});
