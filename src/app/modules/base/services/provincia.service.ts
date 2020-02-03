import { Injectable } from '@angular/core';
import { Provincia } from '../models/provincia';
import { Regione } from '../models/regione';
import { StatoFederato } from '../models/statofederato';
import { Stato } from '../models/stato';
import { Observable, of } from 'rxjs';
import { AllServService } from 'src/app/core/services/all-serv.service';
import { AbstractTenantService } from 'src/app/core/abstract/services/abstract-tenant.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService extends AbstractTenantService<Provincia> {

	constructor(protected allServ: AllServService) {
		super("provinciaBe", allServ);
	}

	public newInstance(): Observable<Provincia> {
		return of(new Provincia());
	}
	
	public retPickStato(provincia: Provincia, stato: Stato) {
		provincia.stato = stato;
		if (provincia.stato && provincia.stato != null) {
			provincia.statoId = provincia.stato.uuid;
		} else {
			provincia.statoId = null;
		}
	}
	
	public retPickStatofederato(provincia: Provincia, statofederato: StatoFederato) {
		provincia.statofederato = statofederato;
		if (provincia.statofederato && provincia.statofederato != null) {
			provincia.statofederatoId = provincia.statofederato.uuid;
		} else {
			provincia.statofederatoId = null;
		}
		if (statofederato.stato != null) {
			this.retPickStato(provincia, statofederato.stato);
		}
	}
	
	public retPickRegione(provincia: Provincia, regione: Regione) {
		provincia.regione = regione;
		if (provincia.regione && provincia.regione != null) {
			provincia.regioneId = provincia.regione.uuid;
		} else {
			provincia.regioneId = null;
		}
		if (regione.statofederato != null) {
			this.retPickStatofederato(provincia, regione.statofederato);
		}
		if (regione.stato != null) {
			this.retPickStato(provincia, regione.stato);
		}
	}

}
