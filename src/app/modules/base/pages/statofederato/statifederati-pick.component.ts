import { AllService } from 'src/app/core/services/all.service';
import { AbstractTablePickComponent } from 'src/app/core/abstract/pages/abstract-table-pick.component';
import { Search } from 'src/app/shared/models/search';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickData } from 'src/app/shared/models/pick-data';
import { StatoFederato } from '../../models/statofederato';
import { StatofederatoService } from '../../services/statofederato.service';

@Component({
  selector: 'app-statifederati-pick',
  templateUrl: '../../../../core/abstract/pages/abstract-table-pick.component.html',
  styleUrls: ['./statifederati-list.component.scss']
})
export class StatifederatiPickComponent extends AbstractTablePickComponent<StatoFederato> {
	public initSearch() {
		this.search = new Search<StatoFederato>(StatoFederato);
	}
	constructor(
		protected all: AllService,
		// Necessari per il Dialog della pick
		public dialogRef: MatDialogRef<StatifederatiPickComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PickData<StatoFederato>,
		protected statofederatoService: StatofederatoService) {
		// stato.pick.title è il titolo della pick.
		super("statofederato.pick.title", all, dialogRef, data, statofederatoService);
	}
} 