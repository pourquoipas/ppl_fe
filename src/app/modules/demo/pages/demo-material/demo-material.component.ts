import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu.service';
import { DEMO_MENU } from 'src/app/core/models/menu-item';
import { MsgService } from 'src/app/core/services/msg.service';

@Component({
  selector: 'app-demo-material',
  templateUrl: './demo-material.component.html',
  styleUrls: ['./demo-material.component.scss']
})
export class DemoMaterialComponent implements OnInit {
	
	aaa = false;
	openPanel = false;

  constructor(
      private msgService: MsgService,
      private menuService: MenuService) {}

  openSnackBar(message: string, action: string) {
    this.msgService.toast(message, action);
  }

	public openOverlay() {
		this.openPanel = !this.openPanel;
	}

  ngOnInit() {
    this.menuService.loadMenu(DEMO_MENU);
  }

}
