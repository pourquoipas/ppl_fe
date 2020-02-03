import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem, ADMIN_MENU } from '../../models/menu-item';
import { MenuService } from '../../services/menu.service';

@Component({
	selector: 'app-main-menu',
	templateUrl: './main-menu.component.html',
	styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

	@Input() menu: MenuItem[];
	@Output() public sidenavClose = new EventEmitter();


	constructor(private menuService: MenuService) {
		this.menu = ADMIN_MENU;
	}

	ngOnInit() {
		this.menuService.menuChanged.subscribe((newMenu) => {
			this.updateMenu(newMenu);
		});
	}

	public updateMenu(newMenu: MenuItem[]) {
		this.menu = newMenu;
	}

	public onMenuClick = () => {
		this.menuService.function = 'app.title';
		this.closeSidenav();
	}

	public closeSidenav() {
		this.sidenavClose.emit('sidenav_close');
	}
	
}
