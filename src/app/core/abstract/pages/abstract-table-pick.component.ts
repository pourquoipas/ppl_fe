import { AbstractPickComponent } from './abstract-pick.component';
import { Table } from 'src/app/shared/models/entity';
import { AllService } from '../../services/all.service';
import { AbstractService } from '../services/abstract.service';
import { FilterType, FilterKind } from 'src/app/shared/models/filter';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { PickData } from 'src/app/shared/models/pick-data';

/** TODO gestione della multi selezione
 * modifiche fatte sulla base di:
 * https://appdividend.com/2019/02/11/angular-modal-tutorial-with-example-angular-material-dialog/
 */
export abstract class AbstractTablePickComponent<T extends Table> extends AbstractPickComponent<T> {
	
	displayedColumns: string[] = ['codice', 'descrizione', 'select'];

	constructor(
		protected title: string,
		protected all: AllService,
		public dialogRef: MatDialogRef<AbstractTablePickComponent<T>>,
		@Inject(MAT_DIALOG_DATA) public data: PickData<T>,
		//        protected router: Router,
		protected service: AbstractService<T>) {
		super(title, all, dialogRef,/* router, */ service);
	}
	
	public initFilters() {
		this.filters.push({name: 'codice', field: 'codice', label: 'table.label.codice', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: true})
		this.filters.push({name: 'descrizione', field: 'descrizione', label: 'table.label.descrizione', type: FilterType.Input, value: null, kind: FilterKind.like, mandatory: false})
	}
	
	public selected(entity: T) {
		this.data.selected = entity;
	}
	
}