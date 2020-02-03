import { Injectable } from '@angular/core';
import { StatoFederato } from '../models/statofederato';
import { AbstractTenantService } from 'src/app/core/abstract/services/abstract-tenant.service';
import { Regione } from '../models/regione';
import { AllServService } from 'src/app/core/services/all-serv.service';
import { Observable, of } from 'rxjs';
import { Stato } from '../models/stato';

@Injectable({
  providedIn: 'root'
})
export class RegioneService extends AbstractTenantService<Regione> {

	constructor(protected allServ: AllServService) {
		super("regioneBe", allServ);
	}

	public newInstance(): Observable<Regione> {
		return of(new Regione());
	}
	
	public retPickStato(regione: Regione, stato: Stato) {
		regione.stato = stato;
		if (regione.stato && regione.stato != null) {
			regione.statoId = regione.stato.uuid;
		} else {
			regione.statoId = null;
		}
	}
	
	public retPickStatofederato(regione: Regione, statofederato: StatoFederato) {
		regione.statofederato = statofederato;
		if (regione.statofederato && regione.statofederato != null) {
			regione.statofederatoId = regione.statofederato.uuid;
		} else {
			regione.statofederatoId = null;
		}
		if (statofederato.stato != null) {
			this.retPickStato(regione, statofederato.stato);
		}

	}
	
}
