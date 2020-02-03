import { Component } from '@angular/core';
import { AbstractEditComponent, ConfigEdit } from 'src/app/core/abstract/pages/abstract-edit-component';
import { Validators, FormGroup } from '@angular/forms';
import { TitoloStudio } from '../../models/titolostudio';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TitoloStudioService } from '../../services/titolo-studio.service';
import { BASE_ROUTES } from '../../conf/base.const';
import { ComboEntry } from 'src/app/core/services/enum-util.service';
import { LivelloTitoloStudioEnum } from '../../models/enums/livellotitolostudioenum';

@Component({
  selector: 'app-titoli-studio-edit',
  templateUrl: './titoli-studio-edit.component.html',
  styleUrls: ['./titoli-studio-edit.component.scss']
})
export class TitoliStudioEditComponent extends AbstractEditComponent<TitoloStudio> {

	public livelli: ComboEntry [];

	public setupForm() {
		// throw new Error("Method not implemented.");
		this.mainForm = this.all.fb.group(
			{
				codice: [this.entity.codice, Validators.required],
				descrizione: [this.entity.descrizione, Validators.required],
				inizio: [this.entity.inizio],
				fine: [this.entity.fine],
				livello: [this.entity.livello],

//				livello: [this.all.enumUtilService.enumFind(LivelloTitoloStudioEnum, 'LivelloTitoloStudioEnum',this.entity.livello)],
			}
		);

	}
	
	protected initSync() {
		this.livelli = this.all.enumUtilService.enumToArray(LivelloTitoloStudioEnum, 'LivelloTitoloStudioEnum');
		super.initSync();
	}

	public refreshForm() {
		this.refreshField('codice', this.mainForm);
		this.refreshField('descrizione', this.mainForm);
		this.refreshDateField('inizio', this.mainForm);
		this.refreshDateField('fine', this.mainForm);
		this.refreshField('livello', this.mainForm);
	}

	public mainForm: FormGroup;

	constructor(
		protected all: AllService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected titoloStudioService: TitoloStudioService) {
		super(new ConfigEdit('titolostudio.title', BASE_ROUTES.BASE + BASE_ROUTES.TITOLISTUDIO, true, true),
			all, router, route, titoloStudioService);
	}

}
