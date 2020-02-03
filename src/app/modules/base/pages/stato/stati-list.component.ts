import { Component, OnInit } from '@angular/core';
import { AbstractListComponent, ConfigList } from 'src/app/core/abstract/pages/abstract-list-component';
import { Stato } from '../../models/stato';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatoService } from '../../services/stato.service';
import { Search } from 'src/app/shared/models/search';
import { FilterType, FilterKind } from 'src/app/shared/models/filter';
import { BASE_ROUTES } from '../../conf/base.const';

@Component({
  selector: 'app-stati-list',
  templateUrl: './stati-list.component.html',
  styleUrls: ['./stati-list.component.scss']
})
export class StatiListComponent  extends AbstractListComponent<Stato> {
	
	displayedColumns: string[] = ['codice', 'descrizione', 'inizio', 'fine', 'azioni'];
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
		protected statoService: StatoService
	) {
		super(new ConfigList('stato.title', BASE_ROUTES.BASE + BASE_ROUTES.STATI, true, true, true),
			/* configService, translateService, msgService, menuService, */ 
			all, router, route, statoService
		);
	}

	public initSearch() {
		this.search = new Search<Stato>(Stato);
	}
	public initFilters() {
		this.filters.push({name: 'codice', field: 'codice', label: 'table.label.codice', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: true})
		this.filters.push({name: 'descrizione', field: 'descrizione', label: 'table.label.descrizione', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false})
	}
}
