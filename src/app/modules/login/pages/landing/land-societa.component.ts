import { Component, OnInit } from '@angular/core';
import { SocietaService } from 'src/app/modules/admin/services/societa.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Societa } from 'src/app/modules/admin/models/societa';
import { MenuService } from 'src/app/core/services/menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GENERIC_ROUTES } from 'src/app/core/configuration/constants';

@Component({
	selector: 'app-land-societa',
	templateUrl: './land-societa.component.html',
	styleUrls: ['./land-societa.component.scss']
})
export class LandSocietaComponent implements OnInit {

	public initialized: boolean = false;
	public societa: Societa[] = [];

	constructor(
		protected authService: AuthService,
		protected menuService: MenuService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected societaService: SocietaService
	) {

	}

	requestedRoute: string;

	ngOnInit() {
		// TODO gestione errori e societa vuoto.
		// Se solo una societa, selezionala subito. 
		this.societaService.all()
			.subscribe(s => {
				s.forEach(s => {
					if (this.authService.userInRole(s.ruoloAccesso)) {
						this.societa.push(s);
					}
				});
				this.route.queryParams
					.subscribe(
						params => {
							if (params) {
								this.requestedRoute = params['requestedRoute'];
							}
							this.initialized = true;
						}
					);
			});
	}

	public select(societa: Societa) {
		this.authService.initUserSession(societa);
		// Imposta la societa sul menu
		// Controlla se l'utente è admin o meno per scegliere se caricare userMenu o adminMenu'
		// Naviga verso la landing page
		this.goLanding();
	}

	private goLanding() {
		if (this.requestedRoute && this.requestedRoute != null) {
			this.router.navigate([this.requestedRoute]);
		} else {
			this.router.navigate([GENERIC_ROUTES.LANDING_PAGE]);
		}
	}
}
