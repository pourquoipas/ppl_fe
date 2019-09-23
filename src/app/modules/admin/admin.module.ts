import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    CoreModule,
  ]
})
export class AdminModule { }
