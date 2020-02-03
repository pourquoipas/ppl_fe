import { Component } from '@angular/core';
import { Comune } from '../../models/comune';
import { AbstractEditComponent, ConfigEdit } from 'src/app/core/abstract/pages/abstract-edit-component';
import { FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ComuneService } from '../../services/comune.service';
import { BASE_ROUTES } from '../../conf/base.const';
import { StatiPickComponent } from '../stato/stati-pick.component';
import { MatDialog } from '@angular/material';
import { StatifederatiPickComponent } from '../statofederato/statifederati-pick.component';
import { RegioniPickComponent } from '../regione/regioni-pick.component';
import { ProvincePickComponent } from '../provincia/province-pick.component';

@Component({
  selector: 'app-comuni-edit',
  templateUrl: './comuni-edit.component.html',
  styleUrls: ['./comuni-edit.component.scss']
})
export class ComuniEditComponent extends AbstractEditComponent<Comune> {
	public mainForm: FormGroup;

	constructor(
		protected all: AllService,
		public dialog: MatDialog,
		protected router: Router,
		protected route: ActivatedRoute,
		protected comuneService: ComuneService) {
		super(new ConfigEdit('comune.title', BASE_ROUTES.BASE + BASE_ROUTES.COMUNI, true, true),
			all, router, route, comuneService);
	}
	public refreshForm() {
		this.refreshField('codice', this.mainForm);
		this.refreshField('descrizione', this.mainForm);
		this.refreshField('codiceStatistico', this.mainForm);
		this.refreshField('cap', this.mainForm);
		this.refreshDateField('inizio', this.mainForm);
		this.refreshDateField('fine', this.mainForm);
	}
	public setupForm() {
		this.mainForm = this.all.fb.group(
			{
				codice: [this.entity.codice, Validators.required],
				descrizione: [this.entity.descrizione, Validators.required],
				codiceStatistico: [this.entity.codiceStatistico],
				cap: [this.entity.cap,
					Validators.compose([
						Validators.pattern("^[0-9]*$"),
	  					Validators.minLength(5),
	  					Validators.maxLength(5),
					])
				],
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
				this.comuneService.retPickStato(this.entity, result.data); 
			}
		});
	}
	public pickStatifederatiOpen() {
		this.dialog.open(StatifederatiPickComponent, {
			width: '1024px',
			data: {filter: this.entity.statofederato}
		}).afterClosed().subscribe(result => {
			if (result) {
				this.comuneService.retPickStatofederato(this.entity, result.data); 
			}
		});
	}
	public pickRegioniOpen() {
		this.dialog.open(RegioniPickComponent, {
			width: '1024px',
			data: {filter: this.entity.regione}
		}).afterClosed().subscribe(result => {
			if (result) {
				this.comuneService.retPickRegione(this.entity, result.data); 
			}
		});
	}
	public pickProvinceOpen() {
		this.dialog.open(ProvincePickComponent, {
			width: '1024px',
			data: {filter: this.entity.provincia}
		}).afterClosed().subscribe(result => {
			if (result) {
				this.comuneService.retPickProvincia(this.entity, result.data); 
			}
		});
	}
	
}
