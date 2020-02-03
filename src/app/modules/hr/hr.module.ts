import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersoneListComponent } from './pages/persone/persone-list.component';
import { HrRoutingModule } from './hr-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PersoneEditComponent } from './pages/persone/persone-edit.component';
import { BaseModule } from '../base/base.module';



@NgModule({
//  entryComponents: [
//	TestDialogPickComponent,
//	StatiPickComponent,
//	StatifederatiPickComponent,
//	RegioniPickComponent,
//	ProvincePickComponent,
//	ComuniPickComponent,
//	],
	
  declarations: [PersoneListComponent, PersoneEditComponent],
  imports: [
    CommonModule,
	BaseModule,
    HrRoutingModule,
    SharedModule,
	TranslateModule.forChild()
  ]
})
export class HrModule { }
