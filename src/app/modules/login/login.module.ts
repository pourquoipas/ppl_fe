import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandSocietaComponent } from './pages/landing/land-societa.component';
import { HomeComponent } from './pages/landing/home.component';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [LandSocietaComponent, HomeComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    // CoreModule,
	TranslateModule.forChild()

  ]
})
export class LoginModule { }
