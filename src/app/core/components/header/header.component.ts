import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	@Output() public sidenavToggle = new EventEmitter();

	constructor(
		protected translateService: TranslateService,
		private menuService: MenuService,
		) { }

	ngOnInit() {
	}

	public onToggleSidenav = () => {
		this.sidenavToggle.emit('sidenav_toggle');
	}
	
	public onSwitchSidenavMode() {
		this.sidenavToggle.emit('sidenav_mode');
	}

	public onTenantClick() {

	}

	public onUserClick() {

	}
	
	public onFavoritesClick() {

	}
	
	public onMoreClick() {
		
	}
	
	public function(): string {
		return this.menuService.function;
	}
	public tenant(): string {
		return this.menuService.tenantName;
	}
}
