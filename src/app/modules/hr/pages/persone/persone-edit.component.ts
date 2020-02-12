import { Component, ViewEncapsulation } from '@angular/core';
import { Persona } from '../../models/persona';
import { AbstractEditComponent, ConfigEdit } from 'src/app/core/abstract/pages/abstract-edit-component';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { AllService } from 'src/app/core/services/all.service';
import { HR_ROUTES } from '../../conf/hr.const';
import { ComboEntry } from 'src/app/core/services/enum-util.service';
import { SessoEnum } from '../../models/enums/sessoenum';
import { StatoCivileEnum } from '../../models/enums/statocivileenum';
import { ComuniPickComponent } from 'src/app/modules/base/pages/comune/comuni-pick.component';
import { ProvincePickComponent } from 'src/app/modules/base/pages/provincia/province-pick.component';
import { StatiPickComponent } from 'src/app/modules/base/pages/stato/stati-pick.component';
import { TitoliStudioPickComponent } from 'src/app/modules/base/pages/titolostudio/titoli-studio-pick.component';
import { AbstractEditHrComponent } from '../../abstract/abstract-edit-hr.component';
import { AbstractControlBuilder } from 'src/app/core/util/abstract-control-builder';
import { RowDataSource } from 'src/app/shared/models/row-data-source';
import { Contatto } from '../../models/contatto';

@Component({
  selector: 'app-persone-edit',
  templateUrl: './persone-edit.component.html',
  styleUrls: ['./persone-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
export class PersoneEditComponent extends AbstractEditHrComponent<Persona> {
	
	public sessi: ComboEntry [];
	public staticivili: ComboEntry [];
	
	public contattiDS: RowDataSource<Contatto> = null; // new RowDataSource<Contatto>();
	
    public setupForm() {
        // throw new Error("Method not implemented.");
//		const build: AbstractControlBuilder = new AbstractControlBuilder();
//		build.group('mainForm')
//		.control('codice', this.entity.codice).disabled(!this.isKeyEditable(), 'codice').validators(this.all.validation.codice(), 'codice')
//		.control
		
        this.mainForm = this.all.fb.group(
            {
                codice: [{value: this.entity.codice, disabled: !this.isKeyFieldEditable('codice')}, this.all.validation.codice()],
                cognome: [{value: this.entity.cognome, disabled: !this.isFieldEditable('cognome')}, this.all.validation.textRequiredMax(50)],
                nome: [{ value: this.entity.nome, disabled: !this.isFieldEditable('nome')}, this.all.validation.textRequiredMax(50)],
                sesso: [{ value: this.entity.sesso, disabled: !this.isFieldEditable('sesso')}, this.all.validation.required()],
                statoCivile: [{ value: this.entity.statoCivile, disabled: !this.isFieldEditable('statoCivile')}, this.all.validation.required()],
                dataNascita: [{ value: this.entity.dataNascita, disabled: !this.isFieldEditable('dataNascita')}],
                codiceFiscale: [this.entity.codiceFiscale, this.all.validation.cf()],
                titoloStudioDesc: [this.entity.titoloStudioDesc, this.all.validation.max(100)],
                titoloStudioAnno: [this.entity.titoloStudioAnno, this.all.validation.positiveInteger()],
				
				residenza_cap: [this.entity.residenza.cap,
					this.all.validation.cap()
//					Validators.compose([
//						Validators.pattern("^[0-9]*$"),
//	  					Validators.minLength(5),
//	  					Validators.maxLength(5),
//					])
				],
				residenza_localita: this.control('residenza_localita', this.entity.residenza.localita, this.all.validation.max(30)),
//				residenza_localita: [{ value: this.entity.residenza.localita, disabled: !this.isFieldEditable('dataNascita')}, this.all.validation.max(30)],
				residenza_indirizzo: [this.entity.residenza.indirizzo,
					this.all.validation.max(50)],
				residenza_civico: [this.entity.residenza.civico,
					this.all.validation.max(10)],
				residenza_interno: [this.entity.residenza.interno,
					this.all.validation.max(10)],
				residenza_scala: [this.entity.residenza.scala,
					this.all.validation.max(10)],
				residenza_edificioDesc: [this.entity.residenza.edificioDesc, this.all.validation.max(100)],
				residenza_aggiuntive: [this.entity.residenza.aggiuntive, this.all.validation.max(100)],
				
				domicilio_cap: [this.entity.domicilio.cap, this.all.validation.cap()],
				domicilio_localita: [this.entity.domicilio.localita, this.all.validation.max(30)],
				domicilio_indirizzo: [this.entity.domicilio.indirizzo, this.all.validation.max(50)],
				domicilio_civico: [this.entity.domicilio.civico,this.all.validation.max(10)],
				domicilio_interno: [this.entity.domicilio.interno, this.all.validation.max(10)],
				domicilio_scala: [this.entity.domicilio.scala, this.all.validation.max(10)],
				domicilio_edificioDesc: [this.entity.domicilio.edificioDesc, this.all.validation.max(100)],
				domicilio_aggiuntive: [this.entity.domicilio.aggiuntive, this.all.validation.max(100)],
            }
        );

    }

	protected afterRetrieve() {
		this.contattiDS = new RowDataSource<Contatto>(this.entity.contatti);
	}
	protected afterCreate() {
		this.contattiDS = new RowDataSource<Contatto>(this.entity.contatti);
	}

	protected initSync() {
		this.sessi = this.all.enumUtilService.enumToArray(SessoEnum, 'SessoEnum');
		this.staticivili = this.all.enumUtilService.enumToArray(StatoCivileEnum, 'StatoCivileEnum');
	}

	public refreshForm() {
		this.refreshField('codice', this.mainForm);
		this.refreshField('cognome', this.mainForm);
		this.refreshField('nome', this.mainForm);
		this.refreshField('sesso', this.mainForm);
		this.refreshField('statoCivile', this.mainForm);
		this.refreshDateField('dataNascita', this.mainForm);
		this.refreshField('codiceFiscale', this.mainForm);
		this.refreshField('titoloStudioDesc', this.mainForm);
		this.refreshField('titoloStudioAnno', this.mainForm);
		
		this.refreshField('residenza_cap', this.mainForm);
		this.refreshField('residenza_localita', this.mainForm);
		this.refreshField('residenza_indirizzo', this.mainForm);
		this.refreshField('residenza_civico', this.mainForm);
		this.refreshField('residenza_interno', this.mainForm);
		this.refreshField('residenza_scala', this.mainForm);
		this.refreshField('residenza_edificioDesc', this.mainForm);
		this.refreshField('residenza_aggiuntive', this.mainForm);

		this.refreshField('domicilio_cap', this.mainForm);
		this.refreshField('domicilio_localita', this.mainForm);
		this.refreshField('domicilio_indirizzo', this.mainForm);
		this.refreshField('domicilio_civico', this.mainForm);
		this.refreshField('domicilio_interno', this.mainForm);
		this.refreshField('domicilio_scala', this.mainForm);
		this.refreshField('domicilio_edificioDesc', this.mainForm);
		this.refreshField('domicilio_aggiuntive', this.mainForm);
		
	}
	
	public mainForm: FormGroup;

	constructor(
		protected all: AllService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected personaService: PersonaService) {
		super(new ConfigEdit('persona.title', HR_ROUTES.HR + HR_ROUTES.PERSONE, true, true),
			all, router, route, personaService);
	}

	public pickComuneNascitaOpen() {
		this.pickOpen(ComuniPickComponent, this.entity, this.personaService.retPickComuneNascita, null);
	}
	public pickProvinciaNascitaOpen() {
		this.pickOpen(ProvincePickComponent, this.entity, this.personaService.retPickProvinciaNascita, null);
	}
	public pickStatoNascitaOpen() {
		this.pickOpen(StatiPickComponent, this.entity, this.personaService.retPickStatoNascita, null);
	}
	public pickCittadinanzaOpen() {
		this.pickOpen(StatiPickComponent, this.entity, this.personaService.retPickCittadinanza, null);
	}
	public pickTitoloStudioOpen() {
		this.pickOpen(TitoliStudioPickComponent, this.entity, this.personaService.retPickTitoloStudio, null);
	}
	public pickResidenzaComuneOpen() {
		this.pickOpen(ComuniPickComponent, this.entity.residenza, this.personaService.retPickIndirizzoComune, this.entity.residenza);
	}
	public pickResidenzaProvinciaOpen() {
		this.pickOpen(ProvincePickComponent, this.entity.residenza, this.personaService.retPickIndirizzoProvincia, this.entity.residenza);
	}
	public pickResidenzaStatoOpen() {
		this.pickOpen(StatiPickComponent, this.entity.residenza, this.personaService.retPickIndirizzoStato, this.entity.residenza);
	}
	public pickDomicilioComuneOpen() {
		this.pickOpen(ComuniPickComponent, this.entity.domicilio, this.personaService.retPickIndirizzoComune, this.entity.domicilio);
	}
	public pickDomicilioProvinciaOpen() {
		this.pickOpen(ProvincePickComponent, this.entity.domicilio, this.personaService.retPickIndirizzoProvincia, this.entity.domicilio);
	}
	public pickDomicilioStatoOpen() {
		this.pickOpen(StatiPickComponent, this.entity.domicilio, this.personaService.retPickIndirizzoStato, this.entity.domicilio);
	}
	
	
	protected control(name: string, value: any = null, validatorFn: ValidatorFn = null, key: boolean = false): FormControl {
		const fcb: AbstractControlBuilder = new AbstractControlBuilder();
		fcb.control(name, (value==null?this.entity[name]: value))
		.disabled((key?this.isKeyFieldEditable(name):this.isFieldEditable(name)))
		.validators(validatorFn);
		return (fcb.build() as FormControl)
	}
}
