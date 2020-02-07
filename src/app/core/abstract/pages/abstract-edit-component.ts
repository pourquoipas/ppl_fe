import { Entity } from 'src/app/shared/models/entity';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractService } from '../services/abstract.service';
import { AbstractInitComponent } from './abstract-init-component';
import { GENERIC_ROUTES } from '../../configuration/constants';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { AllService } from '../../services/all.service';


export class ConfigEdit {
	constructor(
		public title: string,
		public path: string,
		public canEdit: boolean,
		public canDelete: boolean
	) {}
}


export abstract class AbstractEditComponent<T extends Entity> extends AbstractInitComponent {

    public editable: boolean = false;
	public update: boolean = false;
    public entity: T = null;

	constructor(
		protected config: ConfigEdit,
		protected all: AllService,
        protected router: Router,
        protected route: ActivatedRoute,
		protected service: AbstractService<T>) {
		super(all.translateService, all.msgService);
		all.menuService.function = config.title;
	}
	
	/** Recuepero il record da modificare o ne creo uno nuovo se devo (new element) */
	protected initAsync() {
		const uuid: string = this.route.snapshot.params['uuid'];
		if (uuid) {
			this.editable = true;
			this.update = true;
			this.service.retrieve(uuid)
				.subscribe(e => {
					this.entity = e;
					this.afterRetrieve();
					this.setupForm();
					super.initAsync();			
				}, error => {
					this.editable = false;
					super.initAsync();			
				});
		} else {
			this.editable = true;
			this.update = false;
			this.service.newInstance()
				.subscribe(e => {
					this.entity = e;
					this.afterCreate();
					this.setupForm();
					super.initAsync();			
				}, error => {
					this.editable = false;
					super.initAsync();			
				});
		}
	}
	
	protected afterCreate() {
		
	}
	protected afterRetrieve() {
		
	}
	
	/* GEstione form, creazione e refresh */
	public abstract setupForm();
	
	public abstract refreshForm();
	
    protected refreshField(field: string, form: FormGroup) {
        this.refreshFieldWithName(field, field, form);
    }

    protected refreshFieldWithName(field: string, refreshName: string, form: FormGroup) {
        if (this.canManageField(field)) {
            const value = form.get(refreshName).value;
			const parts : string [] = field.split("_");
			let entity = this.entity;
			while (parts.length > 1) {
				entity = entity[parts.shift()];
			}
			this.refreshEntity(parts.shift(), value, entity);
//            if (value === undefined || value === null) {
//                this.entity[field] = null;
//            } else {
//                if (typeof value === 'string') {
//                    if (value.trim().length === 0) {
//                        this.entity[field] = null;
//                        return;
//                    }
//                }
//                this.entity[field] = form.get(refreshName).value;
//            }
        }
    }

	protected refreshEntity(field: string, value: any, entity: any) {
        if (value === undefined || value === null) {
            entity[field] = null;
        } else {
            if (typeof value === 'string') {
                if (value.trim().length === 0) {
                    entity[field] = null;
                    return;
                }
            }
            entity[field] = value;
        }
	}

    protected refreshDateField(field: string, form: FormGroup) {
        this.refreshDateFieldWithFormat(field, form, 'YYYY-MM-DD');
    }

    protected refreshDateFieldWithFormat(field: string, form: FormGroup, format: string) {
        const refreshName = field;
        if (this.canManageField(field)) {
            if (form.get(refreshName).value) {
                const d = moment(form.get(refreshName).value);
                this.entity[field] = d.format(format);
            } else {
                this.entity[field] = null;
            }
        }
    }
	
	
	/** Salvo (insert o update) il record attuale */
    protected save() {
		this.refreshForm();
        if (!this.beforeSave()) {
            return;
        } else {
			if (this.update) {
				this.doUpdate();
			} else {
				this.doInsert();
			}
		}
	}
	protected doInsert() {
        if (!this.beforeInsert()) {
            return;
        }
        this.service.insert(this.entity)
            .subscribe((entity: T) => {
                    this.entity = entity;
                    this.afterInsert();
                    this.navigateAfterSave(true);
                },
                error => {
                    if (!this.handlePersistError(error)) {
                        this.handleError(error);
                    }
                }
            );
    }

	protected doUpdate() {
        if (!this.beforeUpdate()) {
            return;
        }
        this.service.update(this.entity)
            .subscribe((entity: T) => {
                    this.entity = entity;
                    this.afterUpdate();
                    this.navigateAfterSave(true);
                },
                error => {
                    if (!this.handlePersistError(error)) {
                        this.handleError(error);
                    }
                }
            );
    }


	protected beforeSave(): boolean {
		return true;
	} 
	protected afterSave() {
	} 

	protected beforeInsert(): boolean {
		return true;
	} 
	protected afterInsert() {
		this.update = true;
	} 
	
	protected beforeUpdate(): boolean {
		return true;
	} 
	protected afterUpdate() {
	} 

	
	/** decidiamo cosa fare dopo un salvataggio.
	 * per default si torna a list.
     * il parametro boolean indica se proveniamo da una insert o da una update se dovesse servire.
	 */
	protected navigateAfterSave(insert: boolean) {
        if (this.config && this.config.path) {
            this.router.navigate(['/' + this.config.path + '/' + GENERIC_ROUTES.LIST]);
        } else {
            this.router.navigate([GENERIC_ROUTES.CONFIG_CONTROLLER_ERROR]);
        }
	}
	
	public delete() {
		this.refreshForm();
        if (!this.beforeDelete()) {
            return;
        } else {
	        this.service.delete(this.entity)
	            .subscribe((entity: T) => {
	                    this.entity = entity;
	                    this.afterUpdate();
	                    this.navigateAfterSave(true);
	                },
	                error => {
	                    if (!this.handlePersistError(error)) {
	                        this.handleError(error);
	                    }
	                }
	            );
		}
		
	}
	protected beforeDelete(): boolean {
		return true;
	} 
	
	
	public back() {
        if (this.config && this.config.path) {
            this.router.navigate(['/' + this.config.path + '/' + GENERIC_ROUTES.LIST]);
        } else {
            this.router.navigate([GENERIC_ROUTES.CONFIG_CONTROLLER_ERROR]);
        }
	}
	
	/** Per gestire autonomamente eventuali errori di persistenza. se gestiti, ritornare true */
	protected handlePersistError(error): boolean {
		return false;
	}
	
	public canViewField(field: string): boolean {
		return true;
	}
	public canManageField(field: string): boolean {
		return true;
	}
	
	/** Nelle mie tabelle, i campi chiave (univoci, esempio campo codice su una tabella)
	* sono editabili solo fino al primo salvataggio. 
	*/
	public isKeyEditable(): boolean {
		return this.entity && this.entity.uuid == null;
	} 
	
	// Prove pick
	// N.B. create il vostro abstract-edit-<modulo>.component nel vostro modulo e scrivete la pickOpen li
/*	 
	public pickOpen(pickComponent: any, data: any, retPick: (entity: any, result: any) => void, resultObject: any) {
		this.all.dialog.open(pickComponent, {
			width: '1024px',
			data: {filter: data}
		}).afterClosed().subscribe(result => {
			if (result) {
				// this.regioneService.retPickStato(this.entity, result.data);
				if (!(resultObject) || resultObject == null) resultObject = this.entity;
				retPick(resultObject, result.data); 
				console.log(JSON.stringify(data));
			}
		});
	}
*/
	
}

