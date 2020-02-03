import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { Subject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { Tenant } from 'src/app/shared/models/tenant';

@Injectable({
	providedIn: 'root'
})
export class MenuService {

	menuChanged = new Subject<MenuItem[]>();

	public menu: MenuItem[];
	public menuMode = 'push';
	
	public function: string;
	public tenantName: string;
	
	private currentUser: User;
	private currentTenant: Tenant;
	private tenantList: Tenant[];

	constructor() {
		console.log('MenuService created');
		this.function='societa.title';
		this.tenantName='Admin mode';
	}

	public loadMenu(new_menu: MenuItem[]) {
		this.menu = new_menu;
		this.menuChanged.next(this.menu);
	}
	
	public changeMenuMode() {
		if (this.menuMode == 'push') {
			this.menuMode = 'over';
		} else {
			this.menuMode = 'push';
		}
	}
}
