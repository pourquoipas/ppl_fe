import { MyState, MyStateBehaviour, MyStateEvent } from './abstract-state';


export enum InitStateEnum {
	Sync = 'SYNC',
	Async = 'ASYNC'
}

export class InitState implements MyState {
	constructor(
		public initSync: boolean,
		public initAsync: boolean) {
	}
	public initialized() {
		return this.initSync && this.initAsync;
	}
}

export class InitStateSync extends MyStateEvent<boolean> {
	type = InitStateEnum.Sync;
	constructor(public payload: boolean) {super(payload);}	
}
export class InitStateAsync extends MyStateEvent<boolean> {
	type = InitStateEnum.Async;
	constructor(public payload: boolean) {super(payload);}	
}

export class InitStateBehaviour implements MyStateBehaviour<InitState, boolean> {
	handleEvent(currentState: InitState, event: MyStateEvent<boolean>): InitState {
		switch (event.type) {
			case InitStateEnum.Sync:
				currentState.initSync = event.payload;
				return currentState;
			case InitStateEnum.Async:
				currentState.initAsync = event.payload;
				return currentState;
			default:
				return currentState;
		}
	}
}

export const INIT_STATE_BEHAVIOUR = new InitStateBehaviour();

