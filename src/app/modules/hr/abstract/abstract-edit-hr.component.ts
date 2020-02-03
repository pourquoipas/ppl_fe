import { AbstractEditComponent, ConfigEdit } from "src/app/core/abstract/pages/abstract-edit-component";
import { Entity } from 'src/app/shared/models/entity';
import { AllService } from 'src/app/core/services/all.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractService } from 'src/app/core/abstract/services/abstract.service';

export abstract class AbstractEditHrComponent<T extends Entity> extends AbstractEditComponent<T> {
	
	constructor(
		protected config: ConfigEdit,
		protected all: AllService,
        protected router: Router,
        protected route: ActivatedRoute,
		protected service: AbstractService<T>) {
			super(config, all, router, route, service);
	}

	public pickOpen(pickComponent: any, data: any, retPick: (entity: any, result: any) => void, resultObject: any) {
		this.all.dialog.open(pickComponent /* StatiPickComponent */, {
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
	
}