import { Action } from '@ngrx/store';

export class ActionHr<T> implements Action {
    readonly type: string;
	payload: T;
}