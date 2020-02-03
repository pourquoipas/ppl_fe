import { Component } from '@angular/core';
import { AbstractListComponent, ConfigList } from 'src/app/core/abstract/pages/abstract-list-component';
import { Search } from 'src/app/shared/models/search';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BASE_ROUTES } from '../../conf/base.const';
import { FilterType, FilterKind } from 'src/app/shared/models/filter';
import { Comune } from '../../models/comune';
import { ComuneService } from '../../services/comune.service';

@Component({
  selector: 'app-comuni-list',
  templateUrl: './comuni-list.component.html',
  styleUrls: ['./comuni-list.component.scss']
})
export class ComuniListComponent extends AbstractListComponent<Comune> {

	displayedColumns: string[] = ['codice', 'descrizione', 'inizio', 'fine', 'azioni'];

	constructor(protected all: AllService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected comuneService: ComuneService
	) {
		super(new ConfigList('comune.title', BASE_ROUTES.BASE + BASE_ROUTES.COMUNI, true, true, true),
			/* configService, translateService, msgService, menuService, */
			all, router, route, comuneService
		);
	}

	public initFilters() {
		this.filters.push({ name: 'codice', field: 'codice', label: 'table.label.codice', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: true })
		this.filters.push({ name: 'descrizione', field: 'descrizione', label: 'table.label.descrizione', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false })
	}
	public initSearch() {
		this.search = new Search<Comune>(Comune);
	}

}
