import should from 'should';
import expect from 'expect';
import picList from '../lib/picList';

xdescribe('getSortedByTag', ()=> {

	it('should not have duplicate pic names', ()=> {
		let a =[]
		const result = picList.every( obj => {
			if (a.indexOf(obj.name)==-1){
				a.push(obj.name);
				return true;
			} else {
				return false;
			}
		})
		expect(result).toBe(true);
	});

	it('should not have duplicate pic links', ()=> {
		let a =[]
		const result = picList.every( obj => {
			if (a.indexOf(obj.pic)==-1){
				a.push(obj.pic);
				return true;
			} else {
				return false;
			}
		})
		expect(result).toBe(true);
	});

});

