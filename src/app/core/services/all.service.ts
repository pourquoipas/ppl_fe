import { Injectable } from '@angular/core';
import { ConfigService } from '../configuration/config.service';
import { TranslateService } from '@ngx-translate/core';
import { MsgService } from './msg.service';
import { MenuService } from './menu.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EnumUtilService } from './enum-util.service';
import { ValidationService } from './validation.service';

@Injectable({
	providedIn: 'root'
})
export class AllService {

	constructor(
		public fb: FormBuilder,
		public dialog: MatDialog,
		public configService: ConfigService,
		public translateService: TranslateService,
		public msgService: MsgService,
		public menuService: MenuService,
		public enumUtilService: EnumUtilService,
		public validation: ValidationService,

	) { }
}
