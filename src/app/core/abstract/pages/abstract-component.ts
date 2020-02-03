import { TranslateService } from '@ngx-translate/core';
import HttpStatusCode from 'src/app/shared/enum/http-status-code';
import { MsgService } from '../../services/msg.service';

export type ManageErrorCallback = (error: any) => boolean;

/** 
	TODO Serve una gestione delle attività pending. Ovvero se il controller ha in corso attività o meno
	Dovremmo anche definirne la tipologia, del tipo:
	- le attività di inizializzazione son già gestite
	- insert/save/delete (blocco tutto)
	- lettura dati da db
	- attività minori non bloccanti in genere
*/
export abstract class AbstractComponent {

    constructor(
        protected translateService: TranslateService,
        protected msgService: MsgService) {

    }

    protected handleError(error: any, callback: ManageErrorCallback = null) {
		if (!(callback && callback != null && callback.call(null, error))) {
	        if (error.code === HttpStatusCode.FORBIDDEN) {
	            this.translateService.get(['error.forbidden'])
	                .subscribe(res => {
	                    this.msgService.toast(res['error.forbidden'], 'error');
	                });
	        } else if (error.code === HttpStatusCode.REQUEST_TIMEOUT) {
	            this.translateService.get(['error.timeout'])
	                .subscribe(res => {
	                    this.msgService.toast(res['error.timeout'], 'error');
	                });
	            // } else if (error.code === HttpStatusCode.EXPIRED) {
	            //     this.manageEvent(stringToWSNotificationJson('app_logout'));
	            // } else if (error.code === HttpStatusCode.UNAUTHORIZED) {
	            //     this.router.navigate(['/unauthorized']);
	        } else {
	            this.translateService.get(['error.generic'])
	                .subscribe(res => {
	                    this.msgService.toast(res['error.generic'], 'error');
	                });
	        }
		}
    }
}
