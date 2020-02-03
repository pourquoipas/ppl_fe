import { Component } from '@angular/core';
import { AbstractListComponent, ConfigList } from 'src/app/core/abstract/pages/abstract-list-component';
import { TitoloStudio } from '../../models/titolostudio';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TitoloStudioService } from '../../services/titolo-studio.service';
import { Search } from 'src/app/shared/models/search';
import { FilterType, FilterKind } from 'src/app/shared/models/filter';
import { BASE_ROUTES } from '../../conf/base.const';

@Component({
  selector: 'app-titoli-studio-list',
  templateUrl: './titoli-studio-list.component.html',
  styleUrls: ['./titoli-studio-list.component.scss']
})
export class TitoliStudioListComponent extends AbstractListComponent<TitoloStudio> {
	
	displayedColumns: string[] = ['codice', 'descrizione', 'inizio', 'fine', 'azioni'];
	constructor(
		protected all: AllService,
        protected router: Router,
        protected route: ActivatedRoute,
		protected titoloStudioService: TitoloStudioService
	) {
		super(new ConfigList('titolostudio.title', BASE_ROUTES.BASE + BASE_ROUTES.TITOLISTUDIO, true, true, true),
			all, router, route, titoloStudioService
		);
	}

	public initSearch() {
		this.search = new Search<TitoloStudio>(TitoloStudio);
	}
	public initFilters() {
		this.filters.push({name: 'codice', field: 'codice', label: 'table.label.codice', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: true})
		this.filters.push({name: 'descrizione', field: 'descrizione', label: 'table.label.descrizione', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false})
	}
}
