import { Component } from '@angular/core';
import { AbstractListComponent, ConfigList } from 'src/app/core/abstract/pages/abstract-list-component';
import { Search } from 'src/app/shared/models/search';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterType, FilterKind } from 'src/app/shared/models/filter';
import { AllService } from 'src/app/core/services/all.service';
import { Persona } from '../../models/persona';
import { PersonaService } from '../../services/persona.service';
import { HR_ROUTES } from '../../conf/hr.const';

@Component({
  selector: 'app-persone-list',
  templateUrl: './persone-list.component.html',
  styleUrls: ['./persone-list.component.scss']
})
export class PersoneListComponent extends AbstractListComponent<Persona> {
	
	displayedColumns: string[] = ['codice', 'cognome', 'nome', 'sesso', 'dataNascita', 'codiceFiscale', 'azioni'];
	constructor(
		protected all: AllService,
        protected router: Router,
        protected route: ActivatedRoute,
		protected personaService: PersonaService
	) {
		super(new ConfigList('persona.title', HR_ROUTES.HR + HR_ROUTES.PERSONE, true, true, true),
			/* configService, translateService, msgService, menuService, */ 
			all, router, route, personaService
		);
	}

	public initSearch() {
		this.search = new Search<Persona>(Persona);
	}
	public initFilters() {
		this.filters.push({name: 'codice', field: 'codice', label: 'table.label.codice', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: true});
		this.filters.push({name: 'cognome', field: 'cognome', label: 'persona.label.cognome', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false});
		this.filters.push({name: 'nome', field: 'nome', label: 'persona.label.nome', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false});
//		this.filters.push({name: 'sesso', field: 'sesso', label: 'persona.label.sesso', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false});
	}

}
