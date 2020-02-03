import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SocietaListComponent } from './pages/societa/societa-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { SocietaEditComponent } from './pages/societa/societa-edit.component';

@NgModule({
  declarations: [AdminHomeComponent, SocietaListComponent, SocietaEditComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    SharedModule,
    // CoreModule,
	TranslateModule.forChild()
  ]
})
export class AdminModule { }
