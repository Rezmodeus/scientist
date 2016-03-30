import should from 'should';
import expect from 'expect';
import Reducer from '../src/lib/Reducer';
import immutable from 'immutable';

describe('Reducer main basics', ()=> {

	let state, action;
	beforeEach(()=>{
		state = immutable.fromJS({
			entities: {
				door1: {
					type: 'door',
					open: false
				},
				codeDevice1: {
					type: 'device that has code',
					code: ''
				},
				multi: {
					type: 'multi',
					param0: true,
					param1: 0
				},
				lockedDoor1: {
					type: 'locked door',
					open: false
				},
				precondition1:{
					equipped:true,
					entity:'key1',
					enabled:true
				},
				key1:{
					type:'key'
				},
				button1: {
					type: 'unlocking button'
				},
				npc1:{
					type: 'npc',
					name:'Abok',
					quest:'quest1',
					greeting:'Hello'
				},
				quest1:{
					main:'Would you help me open the door',
					started:'Have you done what i asked?',
					completed:'Thank you for opening the door.',
					after:'Good to see you again.',
					fail:'You douche!'
				},
				player1: {
					type: 'player',
					info:'',
					showQuest:'',
					equipped: '',
					inventory: [],
					quests: {
						quest1:'none'
					}
				}
			},
			events:{
				'INTERACT_door1':[{command:'TOGGLE',prop:'open', entity:'door1'}],
				'INTERACT_codeDevice1':[{command:'SET',prop:'code',value:'secret code', entity:'codeDevice1'}],
				'INTERACT_multi':[
					{command:'TOGGLE',prop:'param0', entity:'multi'},
					{command:'SET',prop:'param1',value:2, entity:'multi'}
				],
				'INTERACT_lockedDoor1':[
					{command:'IF',precondition:'precondition1'},
					{command:'TOGGLE',prop:'open', entity:'lockedDoor1'},
					{command:'SET',prop:'enabled', value:false, entity:'precondition1'}
				],
				'INTERACT_button1':[
					{command:'TOGGLE',prop:'open', entity:'lockedDoor1'},
					{command:'SET',prop:'enabled', value:false, entity:'precondition1'}
				],
				'INTERACT_npc1':[
					{command:'COPY',fromEntity:'npc1',fromProp:'quest', toProp:'showQuest'}
				],
				'INTERACT_cancel':[
					{command:'SET',prop:'showQuest', value:''}
				],
				'ACCEPT_quest1':[
					{command:'SETIN', path:['quests','quest1'],value:'started'},
					{command:'SET',prop:'showQuest', value:''}
				]
			}

		});
		action = {};
		action.type = 'INTERACT';
		action.actorId = 'player1';

	});

	it('should change open door', ()=> {
		action.targetId = 'door1';

		expect(state.getIn(['entities','door1','open'])).toBe(false);
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','door1','open'])).toBe(true);

	});

	it('should change set code', ()=> {
		action.targetId = 'codeDevice1';

		expect(state.getIn(['entities','codeDevice1','code'])).toBe('');
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','codeDevice1','code'])).toBe('secret code');

	});

	it('should be able to do many things', ()=> {
		action.targetId = 'multi';

		expect(state.getIn(['entities','multi','param0'])).toBe(true);
		expect(state.getIn(['entities','multi','param1'])).toBe(0);

		state = Reducer.main(state,action);
		expect(state.getIn(['entities','multi','param0'])).toBe(false);
		expect(state.getIn(['entities','multi','param1'])).toBe(2);

	});

	it('should work on locked doors', ()=> {
		action.targetId = 'lockedDoor1';

		// can't open
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(false);
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(false);

		// unlock it
		state = state.setIn(['entities','player1','equipped'],'key1');
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(true);
	});

	it('once door is unlocked it is always unlocked', ()=> {
		action.targetId = 'lockedDoor1';

		state = state.setIn(['entities','player1','equipped'],'key1');
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(true);

		// remove key from player
		state = state.setIn(['entities','player1','equipped'],'');
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(false);
	});

	it('should work with precondition disabled', ()=> {
		action.targetId = 'lockedDoor1';

		state = state.setIn(['entities','precondition1','enabled'],false);
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(false);
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(true);

	});

	it('should unlock with button interaction', ()=> {
		action.targetId = 'button1';

		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(false);
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(true);

	});

	it('should unlock with button and close with interaction', ()=> {
		action.targetId = 'button1';

		state = Reducer.main(state,action);
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(true);

		action.targetId = 'lockedDoor1';
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','lockedDoor1','open'])).toBe(false);
	});

	it('should set quest in player when interacting with npc1', ()=> {
		action.targetId = 'npc1';

		expect(state.getIn(['entities','player1','showQuest'])).toBe('');
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','player1','showQuest'])).toBe('quest1');

		// should remove text on cancel
		action.targetId = 'cancel';
		state = Reducer.main(state,action);
		expect(state.getIn(['entities','player1','showQuest'])).toBe('');
	});

	it('should add quest status to player when accepted', ()=> {
		action.type = 'ACCEPT';
		action.targetId = 'quest1';
		state = Reducer.main(state,action);

		expect(state.getIn(['entities','player1','quests','quest1'])).toBe('started');
		// showQuest should be reset
		expect(state.getIn(['entities','player1','showQuest'])).toBe('');
	});

});

