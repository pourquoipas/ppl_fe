import { Component, OnInit } from '@angular/core';
import { AbstractEditComponent, ConfigEdit } from 'src/app/core/abstract/pages/abstract-edit-component';
import { Validators, FormGroup } from '@angular/forms';
import { Stato } from '../../models/stato';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatoService } from '../../services/stato.service';
import { BASE_ROUTES } from '../../conf/base.const';

@Component({
	selector: 'app-stati-edit',
	templateUrl: './stati-edit.component.html',
	styleUrls: ['./stati-edit.component.scss']
})
export class StatiEditComponent extends AbstractEditComponent<Stato> {

	public setupForm() {
		// throw new Error("Method not implemented.");
		this.mainForm = this.all.fb.group(
			{
				codice: [this.entity.codice, Validators.required],
				descrizione: [this.entity.descrizione, Validators.required],
				inizio: [this.entity.inizio],
				fine: [this.entity.fine],
				isoAlpha2: [this.entity.isoAlpha2, [
					Validators.maxLength(2),
				]],
				isoAlpha3: [this.entity.isoAlpha3, [
					Validators.maxLength(3),
				]],
				isoNumeric: [this.entity.isoNumeric, [
					Validators.pattern("^[0-9]*$"),
					Validators.maxLength(3),
				]],
			}
		);

	}

	public refreshForm() {
		this.refreshField('codice', this.mainForm);
		this.refreshField('descrizione', this.mainForm);
		this.refreshDateField('inizio', this.mainForm);
		this.refreshDateField('fine', this.mainForm);
		this.refreshField('isoAlpha2', this.mainForm);
		this.refreshField('isoAlpha3', this.mainForm);
		this.refreshField('isoNumeric', this.mainForm);
	}

	public mainForm: FormGroup;

	constructor(
		protected all: AllService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected statoService: StatoService) {
		super(new ConfigEdit('stato.title', BASE_ROUTES.BASE + BASE_ROUTES.STATI, true, true),
			all, router, route, statoService);
	}

}
