import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DemoMaterialComponent } from './pages/demo-material/demo-material.component';
import { CoreModule } from 'src/app/core/core.module';


/*
installazione bootstrap
https://www.techiediaries.com/angular-bootstrap/

npm install --save @ng-bootstrap/ng-bootstrap

(https://ng-bootstrap.github.io/#/getting-started)



*/
@NgModule({
  declarations: [DemoMaterialComponent],
  imports: [
    CommonModule,
    SharedModule, 
    DemoRoutingModule
  ]
})
export class DemoModule { 
}
