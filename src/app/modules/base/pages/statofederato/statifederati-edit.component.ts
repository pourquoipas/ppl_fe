import { Component } from '@angular/core';
import { StatoFederato } from '../../models/statofederato';
import { AbstractEditComponent, ConfigEdit } from 'src/app/core/abstract/pages/abstract-edit-component';
import { FormGroup, Validators } from '@angular/forms';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatofederatoService } from '../../services/statofederato.service';
import { BASE_ROUTES } from '../../conf/base.const';
import { StatiPickComponent } from '../stato/stati-pick.component';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'app-statifederati-edit',
	templateUrl: './statifederati-edit.component.html',
	styleUrls: ['./statifederati-edit.component.scss']
})
export class StatifederatiEditComponent extends AbstractEditComponent<StatoFederato> {
	public mainForm: FormGroup;
	
//	public showPicker: boolean = false;
//	public showStatiPick: boolean = true;
//	public pickClose(event: any) {
//		this.showPicker = false;
//	}
//	public pickOpen(event: any) {
//		this.showPicker = true;
//	}
	

	constructor(
		protected all: AllService,
		public dialog: MatDialog,
		protected router: Router,
		protected route: ActivatedRoute,
		protected statofederatoService: StatofederatoService) {
		super(new ConfigEdit('statofederato.title', BASE_ROUTES.BASE + BASE_ROUTES.STATIFEDERATI, true, true),
			all, router, route, statofederatoService);
	}
	public refreshForm() {
		this.refreshField('codice', this.mainForm);
		this.refreshField('descrizione', this.mainForm);
		this.refreshDateField('inizio', this.mainForm);
		this.refreshDateField('fine', this.mainForm);
		// TODO refreshPick ?		this.refreshField('stato', this.mainForm);
	}
	public setupForm() {
		this.mainForm = this.all.fb.group(
			{
				codice: [this.entity.codice, Validators.required],
				descrizione: [this.entity.descrizione, Validators.required],
				inizio: [this.entity.inizio],
				fine: [this.entity.fine],
//				stato: [this.entity.stato],
			}
		);
	}
	
//	public selectStato(stato: Stato) {
//		this.showPicker = false;
//		this.showStatiPick = false;
//		this.entity.stato = stato;
//		this.entity.statoId = stato.uuid;
//	}
//	
//	public cancelPick(event: any) {
//		this.showPicker = false;
//		this.showStatiPick = false;
//	}

	public pickOpen() {
		this.dialog.open(StatiPickComponent, {
			width: '1024px',
			data: {filter: this.entity.stato}
		}).afterClosed().subscribe(result => {
			if (result) {
				this.statofederatoService.retPickStato(this.entity, result.data); 
				console.log(JSON.stringify(this.entity));
			}
		});
	}

}
