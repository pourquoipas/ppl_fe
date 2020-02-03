import { AllService } from 'src/app/core/services/all.service';
import { StatoService } from '../../services/stato.service';
import { AbstractTablePickComponent } from 'src/app/core/abstract/pages/abstract-table-pick.component';
import { Stato } from '../../models/stato';
import { Search } from 'src/app/shared/models/search';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickData } from 'src/app/shared/models/pick-data';

@Component({
  selector: 'app-stati-pick',
  templateUrl: '../../../../core/abstract/pages/abstract-table-pick.component.html',
  styleUrls: ['./stati-list.component.scss']
})
export class StatiPickComponent extends AbstractTablePickComponent<Stato> {
	public initSearch() {
		this.search = new Search<Stato>(Stato);
	}
	constructor(
		protected all: AllService,
		// Necessari per il Dialog della pick
		public dialogRef: MatDialogRef<StatiPickComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PickData<Stato>,
		protected statoService: StatoService) {
		// stato.pick.title è il titolo della pick.
		super("stato.pick.title", all, dialogRef, data, statoService);
	}
} 