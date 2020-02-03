import { InitState, InitializeActionTypes } from '../actions/initialize.actions';
import { ActionHr } from '../actions/hr.action';


export function InitStateReducer(state: InitState, action: ActionHr<boolean>) {
	switch(action.type) {
	case InitializeActionTypes.Sync: 
		return Object.assign({}, state, {
			initSync: action.payload
		});
	case InitializeActionTypes.Async: 
		return Object.assign({}, state, {
			initAsync: action.payload
		})
	default:
		return state;
	}
}
