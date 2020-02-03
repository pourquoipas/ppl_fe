import { Observable, BehaviorSubject } from 'rxjs';
import { OnInit, OnDestroy, Injectable } from '@angular/core';

export interface MyState {

}

export class MyStateEvent<P> {
	readonly type: string;
	constructor( public payload: P) {}
}

export interface MyStateBehaviour<T extends MyState, P> {
	handleEvent(currentState: T, event: MyStateEvent<P>): T;
}


export class MyStateManager<T extends MyState, P> implements OnDestroy {

	state$: Observable<T>;
	private _state$: BehaviorSubject<T>;

	constructor(private initialState: T,
		protected behaviour: MyStateBehaviour<T, P>
	) {
		this._state$ = new BehaviorSubject(this.initialState);
		this.state$ = this._state$.asObservable();
	}

	get state(): T {
		return this._state$.getValue();
	}

	setState(nextState: T): void {
		this._state$.next(nextState);
	}

	handleEvent(event: MyStateEvent<P>) {
		this.setState(this.behaviour.handleEvent(this._state$.getValue(), event));
	}

	ngOnDestroy() {
		this._state$.complete();
	}
}