import { OnInit } from '@angular/core';
import { MyStateManager } from '../../util/abstract-state';
import { InitState, INIT_STATE_BEHAVIOUR, InitStateSync, InitStateAsync } from '../../util/init-state';
import { TranslateService } from '@ngx-translate/core';
import { MsgService } from '../../services/msg.service';
import { AbstractComponent } from './abstract-component';

export abstract class AbstractInitComponent extends AbstractComponent implements OnInit {

	/** Variabile per sapere se il controller è inizializzato.  */
	// protected init: ActivityDone;
	protected init: MyStateManager<InitState, boolean>;
	protected initState: InitState;

    constructor(
        protected translateService: TranslateService,
        protected msgService: MsgService) {
        super(translateService, msgService);
    }

	// ======================= Initialization ============
	ngOnInit(): void {
		this.initState = new InitState(false, false)
		this.init = new MyStateManager<InitState, boolean>(this.initState, INIT_STATE_BEHAVIOUR);
		this.init.state$
			.subscribe(newState => {
				this.initState = newState;
				this.initStateChanged(this.initState);
			});
		this.initSync();
		this.initAsync();
		// throw new Error('Method not implemented.');
	}
	protected initSync() {
		this.init.handleEvent(new InitStateSync(true));
	}
	protected initAsync() {
		this.init.handleEvent(new InitStateAsync(true));
	}
	public initialized(): boolean {
		// return this.init && this.init.state.initialized();
		return this.initState && this.initState.initialized();
	}

	public initStateChanged(newState: InitState) {
		
	}	
	

}