import { Component } from '@angular/core';
import { Regione } from '../../models/regione';
import { AbstractEditComponent, ConfigEdit } from 'src/app/core/abstract/pages/abstract-edit-component';
import { FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RegioneService } from '../../services/regione.service';
import { BASE_ROUTES } from '../../conf/base.const';
import { StatiPickComponent } from '../stato/stati-pick.component';
import { StatifederatiPickComponent } from '../statofederato/statifederati-pick.component';

@Component({
  selector: 'app-regioni-edit',
  templateUrl: './regioni-edit.component.html',
  styleUrls: ['./regioni-edit.component.scss']
})
export class RegioniEditComponent extends AbstractEditComponent<Regione> {
	public mainForm: FormGroup;

	constructor(
		protected all: AllService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected regioneService: RegioneService) {
		super(new ConfigEdit('regione.title', BASE_ROUTES.BASE + BASE_ROUTES.REGIONI, true, true),
			all, router, route, regioneService);
	}
	public refreshForm() {
		this.refreshField('codice', this.mainForm);
		this.refreshField('descrizione', this.mainForm);
		this.refreshDateField('inizio', this.mainForm);
		this.refreshDateField('fine', this.mainForm);
	}
	public setupForm() {
		this.mainForm = this.all.fb.group(
			{
				codice: [this.entity.codice, Validators.required],
				descrizione: [this.entity.descrizione, Validators.required],
				inizio: [this.entity.inizio],
				fine: [this.entity.fine],
			}
		);
	}

	public pickStatiOpen() {
		this.all.dialog.open(StatiPickComponent, {
			width: '1024px',
			data: {filter: this.entity.stato}
		}).afterClosed().subscribe(result => {
			if (result) {
				this.regioneService.retPickStato(this.entity, result.data); 
				console.log(JSON.stringify(this.entity));
			}
		});
	}
	public pickStatifederatiOpen() {
		this.all.dialog.open(StatifederatiPickComponent, {
			width: '1024px',
			data: {filter: this.entity.statofederato}
		}).afterClosed().subscribe(result => {
			if (result) {
				this.regioneService.retPickStatofederato(this.entity, result.data); 
			}
		});
	}

}