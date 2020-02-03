import { AllService } from 'src/app/core/services/all.service';
import { AbstractTablePickComponent } from 'src/app/core/abstract/pages/abstract-table-pick.component';
import { Search } from 'src/app/shared/models/search';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickData } from 'src/app/shared/models/pick-data';
import { Provincia } from '../../models/provincia';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-province-pick',
  templateUrl: '../../../../core/abstract/pages/abstract-table-pick.component.html',
  styleUrls: ['./province-list.component.scss']
})
export class ProvincePickComponent extends AbstractTablePickComponent<Provincia> {
	public initSearch() {
		this.search = new Search<Provincia>(Provincia);
	}
	constructor(
		protected all: AllService,
		// Necessari per il Dialog della pick
		public dialogRef: MatDialogRef<ProvincePickComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PickData<Provincia>,
		protected provinciaService: ProvinciaService) {
		// stato.pick.title è il titolo della pick.
		super("provincia.pick.title", all, dialogRef, data, provinciaService);
	}
} 