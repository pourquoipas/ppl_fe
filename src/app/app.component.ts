import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from './core/services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hr';
    constructor(
		private translateService: TranslateService,
		private menuService: MenuService) {
        this.init();
    }

    private init() {
        this.translateService.addLangs(['it']);
        this.translateService.setDefaultLang('it');

        if (this.translateService.getBrowserLang() !== undefined) {
            this.translateService.use(this.translateService.getBrowserLang());
        } else {
            this.translateService.use('it');
        }
    }

	public menuMode(): string {
		return 'push'; // this.menuService.menuMode;
	}
}
