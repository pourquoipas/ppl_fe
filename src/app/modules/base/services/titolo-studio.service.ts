import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AllServService } from 'src/app/core/services/all-serv.service';
import { AbstractTenantService } from 'src/app/core/abstract/services/abstract-tenant.service';
import { TitoloStudio } from '../models/titolostudio';
@Injectable({
  providedIn: 'root'
})
export class TitoloStudioService extends AbstractTenantService<TitoloStudio> {

	constructor(protected allServ: AllServService) {
		super("titolostudioBe", allServ);
	}

	public newInstance(): Observable<TitoloStudio> {
		return of(new TitoloStudio());
	}

}
