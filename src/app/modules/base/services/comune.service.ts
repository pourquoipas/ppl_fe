import { Injectable } from '@angular/core';
import { Provincia } from '../models/provincia';
import { Regione } from '../models/regione';
import { StatoFederato } from '../models/statofederato';
import { Stato } from '../models/stato';
import { Observable, of } from 'rxjs';
import { AllServService } from 'src/app/core/services/all-serv.service';
import { AbstractTenantService } from 'src/app/core/abstract/services/abstract-tenant.service';
import { Comune } from '../models/comune';

@Injectable({
  providedIn: 'root'
})
export class ComuneService extends AbstractTenantService<Comune> {

	constructor(protected allServ: AllServService) {
		super("comuneBe", allServ);
	}

	public newInstance(): Observable<Comune> {
		return of(new Comune());
	}
	
	public retPickStato(comune: Comune, stato: Stato) {
		comune.stato = stato;
		if (comune.stato && comune.stato != null) {
			comune.statoId = comune.stato.uuid;
		} else {
			comune.statoId = null;
		}
	}
	
	public retPickStatofederato(comune: Comune, statofederato: StatoFederato) {
		comune.statofederato = statofederato;
		if (comune.statofederato && comune.statofederato != null) {
			comune.statofederatoId = comune.statofederato.uuid;
		} else {
			comune.statofederatoId = null;
		}
		if (statofederato.stato != null) {
			this.retPickStato(comune, statofederato.stato);
		}
		
	}
	
	public retPickRegione(comune: Comune, regione: Regione) {
		comune.regione = regione;
		if (comune.regione && comune.regione != null) {
			comune.regioneId = comune.regione.uuid;
		} else {
			comune.regioneId = null;
		}
		if (regione.statofederato != null) {
			this.retPickStatofederato(comune, regione.statofederato);
		}
		if (regione.stato != null) {
			this.retPickStato(comune, regione.stato);
		}
		
	}

	
	public retPickProvincia(comune: Comune, provincia: Provincia) {
		comune.provincia = provincia;
		if (comune.provincia && comune.provincia != null) {
			comune.provinciaId = comune.provincia.uuid;
		} else {
			comune.provinciaId = null;
		}
		if (provincia.regione != null) {
			this.retPickRegione(comune, provincia.regione);
		}
		if (provincia.statofederato != null) {
			this.retPickStatofederato(comune, provincia.statofederato);
		}
		if (provincia.stato != null) {
			this.retPickStato(comune, provincia.stato);
		}
		
	}
}
