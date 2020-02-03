import { Injectable } from '@angular/core';
import { AbstractTenantService } from 'src/app/core/abstract/services/abstract-tenant.service';
import { AllServService } from 'src/app/core/services/all-serv.service';
import { Observable, of } from 'rxjs';
import { Stato } from '../models/stato';

@Injectable({
  providedIn: 'root'
})
export class StatoService extends AbstractTenantService<Stato> {

  constructor(
        protected allServ: AllServService,
	) {
		super('statoBe', allServ);
	 }

	public newInstance(): Observable<Stato> {
		return of(new Stato());
	}
	
}
