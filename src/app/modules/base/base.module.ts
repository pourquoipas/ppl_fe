import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { StatiListComponent } from './pages/stato/stati-list.component';
import { StatiEditComponent } from './pages/stato/stati-edit.component';
import { StatifederatiListComponent } from './pages/statofederato/statifederati-list.component';
import { StatifederatiEditComponent } from './pages/statofederato/statifederati-edit.component';
import { StatiPickComponent } from './pages/stato/stati-pick.component';
import { TestDialogPickComponent } from './pages/test-dialog-pick/test-dialog-pick.component';
import { RegioniListComponent } from './pages/regione/regioni-list.component';
import { RegioniEditComponent } from './pages/regione/regioni-edit.component';
import { ProvinceListComponent } from './pages/provincia/province-list.component';
import { ProvinceEditComponent } from './pages/provincia/province-edit.component';
import { ComuniListComponent } from './pages/comune/comuni-list.component';
import { ComuniEditComponent } from './pages/comune/comuni-edit.component';
import { StatifederatiPickComponent } from './pages/statofederato/statifederati-pick.component';
import { RegioniPickComponent } from './pages/regione/regioni-pick.component';
import { ProvincePickComponent } from './pages/provincia/province-pick.component';
import { ComuniPickComponent } from './pages/comune/comuni-pick.component';
import { TitoliStudioListComponent } from './pages/titolostudio/titoli-studio-list.component';
import { TitoliStudioEditComponent } from './pages/titolostudio/titoli-studio-edit.component';
import { TitoliStudioPickComponent } from './pages/titolostudio/titoli-studio-pick.component';


@NgModule({
  entryComponents: [
	TestDialogPickComponent,
	StatiPickComponent,
	StatifederatiPickComponent,
	RegioniPickComponent,
	ProvincePickComponent,
	ComuniPickComponent,
	TitoliStudioPickComponent,
	],
  declarations: [
	StatiListComponent, StatiEditComponent, StatiPickComponent, 
	StatifederatiListComponent, StatifederatiEditComponent, StatifederatiPickComponent,
	TestDialogPickComponent, 
	RegioniListComponent, RegioniEditComponent, RegioniPickComponent, 
	ProvinceListComponent, ProvinceEditComponent, ProvincePickComponent, 
	ComuniListComponent, ComuniEditComponent, ComuniPickComponent, 
	TitoliStudioListComponent, TitoliStudioEditComponent, TitoliStudioPickComponent,
	],
  exports: [
	StatiPickComponent,
	StatifederatiPickComponent,
	RegioniPickComponent,
	ProvincePickComponent,
	ComuniPickComponent,
	TitoliStudioPickComponent,
	],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule,
    // CoreModule,
	TranslateModule.forChild()
  ]
})
export class BaseModule { }
