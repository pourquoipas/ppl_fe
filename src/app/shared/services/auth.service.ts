import { Injectable } from '@angular/core';
import { Tenant } from '../models/tenant';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _tenant: Tenant;

	constructor() { }

	public username(): string {
		// TODO
		return "admin";
	}	
	public userInRole(role: string): boolean {
		// TODO
		return true;
	}
	
	public set tenant(tenant: Tenant) {
		this._tenant = tenant;
		if (this._tenant) {
			sessionStorage.setItem('ppl.tenant', this._tenant.codice);
		} else {
			sessionStorage.removeItem('ppl.tenant');
		}
	}	
	
	public get tenant(): Tenant {
		return this._tenant;
	}
	
	public initUserSession(tenant: Tenant) {
		this.tenant = tenant;
	}
	
	public isLoggedIn(): boolean  {
		return true;		
	}
	
	public isTenantChoose(): boolean {
		return (this._tenant && this._tenant != null)
	}
}
