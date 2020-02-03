import { ActionHr } from './hr.action';

export class InitState {
	constructor(
		public initSync: boolean,
		public initAsync: boolean
	) {}
}

export const initialInitState: InitState = new InitState(false, false);
//{
//	initSync: false,
//	initAsync: false
//}

export enum InitializeActionTypes {
	Sync = 'initSync',
	Async = 'initAsync'
}

export class InitializeSync extends ActionHr<boolean> {
	readonly type = InitializeActionTypes.Sync;
	constructor(public payload: boolean) {super();}
}
export class InitializeAsync extends ActionHr<boolean> {
	readonly type = InitializeActionTypes.Async;
	constructor(public payload: boolean) {super();}
}
