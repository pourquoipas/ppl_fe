import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/core/abstract/services/abstract.service';
import { Societa } from '../models/societa';
import { Observable, of } from 'rxjs';
import { AllServService } from 'src/app/core/services/all-serv.service';

@Injectable({
  providedIn: 'root'
})
export class SocietaService extends AbstractService<Societa> {

  constructor(
        protected allServ: AllServService,
	) {
		super('societaBe', allServ);
	 }

	public newInstance(): Observable<Societa> {
		return of(new Societa());
	}
}
