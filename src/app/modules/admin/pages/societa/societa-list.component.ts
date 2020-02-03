import { Component } from '@angular/core';
import { AbstractListComponent, ConfigList } from 'src/app/core/abstract/pages/abstract-list-component';
import { Societa } from '../../models/societa';
import { SocietaService } from '../../services/societa.service';
import { Search } from 'src/app/shared/models/search';
import { ADMIN_ROUTES } from '../../constants/admin-constants';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterType, FilterKind } from 'src/app/shared/models/filter';
import { AllService } from 'src/app/core/services/all.service';



@Component({
	selector: 'app-societa-list',
	templateUrl: './societa-list.component.html',
	styleUrls: ['./societa-list.component.scss']
})
export class SocietaListComponent extends AbstractListComponent<Societa> {
	
	displayedColumns: string[] = ['codice', 'descrizione', 'azioni'];
	constructor(
/*		
		protected configService: ConfigService,
		protected translateService: TranslateService,
		protected msgService: MsgService,
		protected menuService: MenuService,
*/		
		protected all: AllService,
        protected router: Router,
        protected route: ActivatedRoute,
		protected societaService: SocietaService
	) {
		super(new ConfigList('societa.title', ADMIN_ROUTES.SOCIETA, true, true, true),
			/* configService, translateService, msgService, menuService, */ 
			all, router, route, societaService
		);
	}

	public initSearch() {
		this.search = new Search<Societa>(Societa);
	}
	public initFilters() {
		this.filters.push({name: 'codice', field: 'codice', label: 'table.label.codice', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: true})
		this.filters.push({name: 'descrizione', field: 'descrizione', label: 'table.label.descrizione', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false})
	}

}
