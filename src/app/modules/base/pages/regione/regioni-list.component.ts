import { Component } from '@angular/core';
import { AbstractListComponent, ConfigList } from 'src/app/core/abstract/pages/abstract-list-component';
import { Search } from 'src/app/shared/models/search';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BASE_ROUTES } from '../../conf/base.const';
import { FilterType, FilterKind } from 'src/app/shared/models/filter';
import { Regione } from '../../models/regione';
import { RegioneService } from '../../services/regione.service';

@Component({
  selector: 'app-regioni-list',
  templateUrl: './regioni-list.component.html',
  styleUrls: ['./regioni-list.component.scss']
})
export class RegioniListComponent  extends AbstractListComponent<Regione> {

	displayedColumns: string[] = ['codice', 'descrizione', 'inizio', 'fine', 'azioni'];

	constructor(protected all: AllService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected regioneService: RegioneService
	) {
		super(new ConfigList('regione.title', BASE_ROUTES.BASE + BASE_ROUTES.REGIONI, true, true, true),
			/* configService, translateService, msgService, menuService, */
			all, router, route, regioneService
		);
	}

	public initFilters() {
		this.filters.push({ name: 'codice', field: 'codice', label: 'table.label.codice', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: true })
		this.filters.push({ name: 'descrizione', field: 'descrizione', label: 'table.label.descrizione', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false })
	}
	public initSearch() {
		this.search = new Search<Regione>(Regione);
	}

}