import ReducerLib from './ReducerLib';

export default {
	main(state, action){
		let entities = state.get('entities');

		const actor = entities.get(action.actorId);
		const key = action.type+'_'+action.targetId;
		const events = state.getIn(['events',key]);
		if (events){
			events.some( event => {
				const command = event.get('command');
				if (!event.has('entity')){
					event = event.set('entity',action.actorId);
				}
				let targetId = event.get('entity');
				let target = entities.get(targetId);
				let returnVal = false;
				switch(command) {
					case 'TOGGLE':
						target = target.update(event.get('prop'), prop => !prop);
						break;
					case 'SET':
						target = target.set(event.get('prop'), event.get('value'));
						break;
					case 'SETIN':
						target = target.setIn([...event.get('path').toJS()], event.get('value'));
						break;
					case 'COPY':
						target = target.set(event.get('toProp'),entities.getIn([event.get('fromEntity'),event.get('fromProp')]));
						break;
					case 'HAS':
						// check if properties are correctly set, use for quest completion
						break;
					case 'IF':
						const precondition = entities.get(event.get('precondition'));
						returnVal = !ReducerLib.checkPrecondition(state,actor,target,precondition);
						break;
			}
				entities = entities.set(targetId,target);
				return returnVal;
			});
		}
		state = state.set('entities',entities);

	return state;
	},
	npc(state,action){

	}
}

