import { AllService } from 'src/app/core/services/all.service';
import { AbstractTablePickComponent } from 'src/app/core/abstract/pages/abstract-table-pick.component';
import { Search } from 'src/app/shared/models/search';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PickData } from 'src/app/shared/models/pick-data';
import { TitoloStudioService } from '../../services/titolo-studio.service';
import { TitoloStudio } from '../../models/titolostudio';

@Component({
  selector: 'app-titolistudio-pick',
  templateUrl: '../../../../core/abstract/pages/abstract-table-pick.component.html',
  styleUrls: ['./titoli-studio-list.component.scss']
})
export class TitoliStudioPickComponent extends AbstractTablePickComponent<TitoloStudio> {
	public initSearch() {
		this.search = new Search<TitoloStudio>(TitoloStudio);
	}
	constructor(
		protected all: AllService,
		// Necessari per il Dialog della pick
		public dialogRef: MatDialogRef<TitoliStudioPickComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PickData<TitoloStudio>,
		protected titoloStudioService: TitoloStudioService) {
		// stato.pick.title è il titolo della pick.
		super("stato.pick.title", all, dialogRef, data, titoloStudioService);
	}
} 