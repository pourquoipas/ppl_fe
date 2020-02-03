import { Component } from '@angular/core';
import { StatoFederato } from '../../models/statofederato';
import { AbstractListComponent, ConfigList } from 'src/app/core/abstract/pages/abstract-list-component';
import { Search } from 'src/app/shared/models/search';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatofederatoService } from '../../services/statofederato.service';
import { BASE_ROUTES } from '../../conf/base.const';
import { FilterType, FilterKind } from 'src/app/shared/models/filter';

@Component({
	selector: 'app-statifederati-list',
	templateUrl: './statifederati-list.component.html',
	styleUrls: ['./statifederati-list.component.scss']
})
export class StatifederatiListComponent extends AbstractListComponent<StatoFederato> {

	displayedColumns: string[] = ['codice', 'descrizione', 'inizio', 'fine', 'azioni'];

	constructor(protected all: AllService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected statofederatoService: StatofederatoService
	) {
		super(new ConfigList('statofederato.title', BASE_ROUTES.BASE + BASE_ROUTES.STATIFEDERATI, true, true, true),
			/* configService, translateService, msgService, menuService, */
			all, router, route, statofederatoService
		);
	}

	public initFilters() {
		this.filters.push({ name: 'codice', field: 'codice', label: 'table.label.codice', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: true })
		this.filters.push({ name: 'descrizione', field: 'descrizione', label: 'table.label.descrizione', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false })
	}
	public initSearch() {
		this.search = new Search<StatoFederato>(StatoFederato);
	}

}
