import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialComponent } from './pages/demo-material/demo-material.component';


const routes: Routes = [
  {path: '', redirectTo: 'material', pathMatch: 'full'},
    {path: 'material', component: DemoMaterialComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
