import { Injectable } from '@angular/core';
import { TenantEntity } from 'src/app/shared/models/entity';
import { AbstractService } from './abstract.service';
import { AllServService } from '../../services/all-serv.service';
import { Search } from 'src/app/shared/models/search';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractTenantService<T extends TenantEntity> extends AbstractService<T> {

  constructor(
		//		protected 
		protected bePath: string,
		protected allServ: AllServService
	) { 
		super(bePath, allServ);
	}
	
	public preInsert(entity: T): boolean {
		let rv = super.preInsert(entity);
		if (rv && (!entity.societa || entity.societa == null)) {
			entity.societa = this.allServ.authService.tenant.codice;
		}
		return rv;
	}
	public preUpdate(entity: T): boolean {
		let rv = super.preUpdate(entity);
// Sarà stata impostata nell'insert la societa'		
//		if (rv && (!entity.societa || entity.societa == null)) {
//			entity.societa = this.allServ.authService.tenant.codice;
//		}
		return rv;
	}
	public preFind(search: Search<T>): boolean {
		let rv = super.preFind(search);
		if (rv && (!search.eq.societa || search.eq.societa == null)) {
			search.eq.societa = this.allServ.authService.tenant.codice;
		}
		return rv;
	}
	
}
