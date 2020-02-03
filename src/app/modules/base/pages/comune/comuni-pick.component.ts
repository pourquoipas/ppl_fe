import { AllService } from 'src/app/core/services/all.service';
import { AbstractTablePickComponent } from 'src/app/core/abstract/pages/abstract-table-pick.component';
import { Search } from 'src/app/shared/models/search';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickData } from 'src/app/shared/models/pick-data';
import { Comune } from '../../models/comune';
import { ComuneService } from '../../services/comune.service';

@Component({
  selector: 'app-comuni-pick',
  templateUrl: '../../../../core/abstract/pages/abstract-table-pick.component.html',
  styleUrls: ['./comuni-list.component.scss']
})
export class ComuniPickComponent extends AbstractTablePickComponent<Comune> {
	public initSearch() {
		this.search = new Search<Comune>(Comune);
	}
	constructor(
		protected all: AllService,
		// Necessari per il Dialog della pick
		public dialogRef: MatDialogRef<ComuniPickComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PickData<Comune>,
		protected comuneService: ComuneService) {
		// stato.pick.title è il titolo della pick.
		super("comune.pick.title", all, dialogRef, data, comuneService);
	}
} 