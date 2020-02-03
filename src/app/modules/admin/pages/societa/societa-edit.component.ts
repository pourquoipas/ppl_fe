import { Component, OnInit } from '@angular/core';
import { Societa } from '../../models/societa';
import { AbstractEditComponent, ConfigEdit } from 'src/app/core/abstract/pages/abstract-edit-component';
import { Router, ActivatedRoute } from '@angular/router';
import { SocietaService } from '../../services/societa.service';
import { ADMIN_ROUTES } from '../../constants/admin-constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllService } from 'src/app/core/services/all.service';

@Component({
	selector: 'app-societa-edit',
	templateUrl: './societa-edit.component.html',
	styleUrls: ['./societa-edit.component.scss']
})
export class SocietaEditComponent extends AbstractEditComponent<Societa> {
    public setupForm() {
        // throw new Error("Method not implemented.");
        this.mainForm = this.all.fb.group(
            {
                codice: [this.entity.codice, Validators.required],
                descrizione: [this.entity.descrizione, Validators.required],
                ruoloAccesso: [this.entity.ruoloAccesso],
            }
        );

    }

	public refreshForm() {
		this.refreshField('codice', this.mainForm);
		this.refreshField('descrizione', this.mainForm);
		this.refreshField('ruoloAccesso', this.mainForm);
	}
	
	public mainForm: FormGroup;

	constructor(
		protected all: AllService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected societaService: SocietaService) {
		super(new ConfigEdit('societa.title', ADMIN_ROUTES.SOCIETA, true, true),
			all, router, route, societaService);
	}

}
