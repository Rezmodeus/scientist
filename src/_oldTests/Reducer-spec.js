import should from 'should';
import expect from 'expect';
import Reducer from '../lib/Reducer';
import immutable from 'immutable';

describe('Reducer basics', ()=> {

	let state, action;
	beforeEach(()=>{
		state = immutable.fromJS({
			door1:{
				type:'door',
				commands:[
					['TOGGLE','open']
				],
				open:false
			},
			codeDevice1:{
				type:'device that has code',
				commands:[
					['SET','code','secret code']
				],
				code:''

			},
			multi:{
				type:'multi',
				commands:[
					['TOGGLE','param0'],
					['SET','param1',2]
				],
				param0:true,
				param1:0
			},
			lockedDoor:{
				type:'locked door',
				commands:[
					['REQUIRED','equipped','key1'],
					['MSG','it is locked']
				],
				okCommands:[
					['TOGGLE','open']
				],
				open:false
			},
			player1:{
				type:'player',
				equipped:[]
			}

		});
		action = {};

	});

	it('should change open door', ()=> {
		expect(state.getIn(['door1','open'])).toBe(false);

		action.type = 'PLAYER_INTERACTION';
		action.actorId = 'player1';
		action.targetId = 'door1';

		state = Reducer(state,action);
		expect(state.getIn(['door1','open'])).toBe(true);

	});

	it('should change set code', ()=> {
		expect(state.getIn(['codeDevice1','code'])).toBe('');

		action.type = 'PLAYER_INTERACTION';
		action.actorId = 'player1';
		action.targetId = 'codeDevice1';

		state = Reducer(state,action);
		expect(state.getIn(['codeDevice1','code'])).toBe('secret code');

	});

	it('should be able to do many things', ()=> {
		expect(state.getIn(['multi','param0'])).toBe(true);
		expect(state.getIn(['multi','param1'])).toBe(0);

		action.type = 'PLAYER_INTERACTION';
		action.actorId = 'player1';
		action.targetId = 'multi';

		state = Reducer(state,action);
		expect(state.getIn(['multi','param0'])).toBe(false);
		expect(state.getIn(['multi','param1'])).toBe(2);

	});

	it('should work on locked doors', ()=> {
		expect(state.getIn(['lockedDoor','open'])).toBe(false);

		action.type = 'PLAYER_INTERACTION';
		action.actorId = 'player1';
		action.targetId = 'lockedDoor';

		state = Reducer(state,action);
		expect(state.getIn(['lockedDoor','open'])).toBe(false);

		// unlock it
		state = state.setIn(['player1','equipped',0],'key1');
		expect(state.getIn(['lockedDoor','open'])).toBe(true);

	});

});

