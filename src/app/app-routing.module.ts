import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

//  {path: '', redirectTo: 'admin', pathMatch: 'full'},
const routes: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
//    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
