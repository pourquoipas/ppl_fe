import { Component } from '@angular/core';
import { Provincia } from '../../models/provincia';
import { AbstractEditComponent, ConfigEdit } from 'src/app/core/abstract/pages/abstract-edit-component';
import { FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProvinciaService } from '../../services/provincia.service';
import { BASE_ROUTES } from '../../conf/base.const';
import { StatiPickComponent } from '../stato/stati-pick.component';
import { MatDialog } from '@angular/material';
import { StatifederatiPickComponent } from '../statofederato/statifederati-pick.component';
import { RegioniPickComponent } from '../regione/regioni-pick.component';

@Component({
  selector: 'app-province-edit',
  templateUrl: './province-edit.component.html',
  styleUrls: ['./province-edit.component.scss']
})
export class ProvinceEditComponent extends AbstractEditComponent<Provincia> {
	public mainForm: FormGroup;

	constructor(
		protected all: AllService,
		public dialog: MatDialog,
		protected router: Router,
		protected route: ActivatedRoute,
		protected provinciaService: ProvinciaService) {
		super(new ConfigEdit('provincia.title', BASE_ROUTES.BASE + BASE_ROUTES.PROVINCE, true, true),
			all, router, route, provinciaService);
	}
	public refreshForm() {
		this.refreshField('codice', this.mainForm);
		this.refreshField('descrizione', this.mainForm);
		this.refreshField('sigla', this.mainForm);
		this.refreshDateField('inizio', this.mainForm);
		this.refreshDateField('fine', this.mainForm);
	}
	public setupForm() {
		this.mainForm = this.all.fb.group(
			{
				codice: [this.entity.codice, Validators.required],
				descrizione: [this.entity.descrizione, Validators.required],
				sigla: [this.entity.sigla],
				inizio: [this.entity.inizio],
				fine: [this.entity.fine],
			}
		);
	}

	public pickStatiOpen() {
		this.dialog.open(StatiPickComponent, {
			width: '1024px',
			data: {filter: this.entity.stato}
		}).afterClosed().subscribe(result => {
			if (result) {
				this.provinciaService.retPickStato(this.entity, result.data); 
			}
		});
	}
	public pickStatifederatiOpen() {
		this.dialog.open(StatifederatiPickComponent, {
			width: '1024px',
			data: {filter: this.entity.statofederato}
		}).afterClosed().subscribe(result => {
			if (result) {
				this.provinciaService.retPickStatofederato(this.entity, result.data); 
			}
		});
	}
	public pickRegioniOpen() {
		this.dialog.open(RegioniPickComponent, {
			width: '1024px',
			data: {filter: this.entity.regione}
		}).afterClosed().subscribe(result => {
			if (result) {
				this.provinciaService.retPickRegione(this.entity, result.data); 
			}
		});
	}
	
}