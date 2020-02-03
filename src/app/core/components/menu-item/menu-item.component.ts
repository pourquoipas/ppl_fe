import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '../../models/menu-item';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-menu-item',
	templateUrl: './menu-item.component.html',
	styleUrls: ['./menu-item.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MenuItemComponent implements OnInit {

	@Input() item: MenuItem;
	@Input() collapsedHeight: string = '16px';
	@Input() expandedHeight: string = '24px';
	@Output() public sidenavClose = new EventEmitter();

	constructor(
		private menuService: MenuService,
		private router: Router
	) {}

	ngOnInit() {
	}

	public isFolder(): boolean {
		return this.item != null && this.item.items != null && this.item.items.length > 0;
	}
	public isVoice(): boolean {
		return this.item != null && !this.isFolder();
	}

	public onMenuClick = () => {
		this.menuService.function = 'app.title';
		this.closeSidenav();
	}

	public closeSidenav() {
		this.sidenavClose.emit('sidenav_close');
	}
	
	public navigate(location: string) {
		this.menuService.function = 'app.title';
		this.router.navigate([location]);
		this.closeSidenav();
	}
}
