export default {
	checkPrecondition(state,actor,target,precondition){
		if (!precondition.get('enabled')){
			return true;
		}
		const equipped = precondition.get('equipped');
		if (equipped){
			return actor.get('equipped') == precondition.get('entity');
		} else {
			return actor.hasIn(['inventory'],precondition.get('entity'));
		}
	}
}

