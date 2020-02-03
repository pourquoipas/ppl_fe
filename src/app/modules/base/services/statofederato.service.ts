import { Injectable } from '@angular/core';
import { StatoFederato } from '../models/statofederato';
import { AbstractTenantService } from 'src/app/core/abstract/services/abstract-tenant.service';
import { AllServService } from 'src/app/core/services/all-serv.service';
import { of, Observable } from 'rxjs';
import { Stato } from '../models/stato';

@Injectable({
	providedIn: 'root'
})
export class StatofederatoService extends AbstractTenantService<StatoFederato> {

	constructor(protected allServ: AllServService) {
		super("statofederatoBe", allServ);
	}

	public newInstance(): Observable<StatoFederato> {
		return of(new StatoFederato());
	}
	
	public retPickStato(statoFederato: StatoFederato, stato: Stato) {
		statoFederato.stato = stato;
		if (statoFederato.stato && statoFederato.stato != null) {
			statoFederato.statoId = statoFederato.stato.uuid;
		} else {
			statoFederato.statoId = null;
		}
	}
}
