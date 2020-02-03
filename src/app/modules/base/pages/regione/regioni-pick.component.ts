import { AllService } from 'src/app/core/services/all.service';
import { AbstractTablePickComponent } from 'src/app/core/abstract/pages/abstract-table-pick.component';
import { Search } from 'src/app/shared/models/search';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickData } from 'src/app/shared/models/pick-data';
import { Regione } from '../../models/regione';
import { RegioneService } from '../../services/regione.service';

@Component({
  selector: 'app-stati-pick',
  templateUrl: '../../../../core/abstract/pages/abstract-table-pick.component.html',
  styleUrls: ['./regioni-list.component.scss']
})
export class RegioniPickComponent extends AbstractTablePickComponent<Regione> {
	public initSearch() {
		this.search = new Search<Regione>(Regione);
	}
	constructor(
		protected all: AllService,
		// Necessari per il Dialog della pick
		public dialogRef: MatDialogRef<RegioniPickComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PickData<Regione>,
		protected regioneService: RegioneService) {
		// stato.pick.title è il titolo della pick.
		super("regione.pick.title", all, dialogRef, data, regioneService);
	}
} 