import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminModule } from './modules/admin/admin.module';
import { DemoModule } from './modules/demo/demo.module';
import { BaseModule } from './modules/base/base.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginModule } from './modules/login/login.module';
import { HrModule } from './modules/hr/hr.module';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'admin',
    loadChildren: () => AdminModule,

//    loadChildren: './modules/admin/admin.module#AdminModule',
//    canActivate: [AdminGuard]
  },
  {
    path: 'demo',
    loadChildren:  () => DemoModule,
//    loadChildren: './modules/demo/demo.module#DemoModule',
  },
  {
    path: 'base',
	canActivate: [AuthGuard],
    loadChildren:  () => BaseModule,
//    loadChildren: './modules/demo/demo.module#DemoModule',
  },
  {
    path: 'hr',
	canActivate: [AuthGuard],
    loadChildren:  () => HrModule,
//    loadChildren: './modules/demo/demo.module#DemoModule',
  },
  {
    path: 'login',
    loadChildren:  () => LoginModule,
//    loadChildren: './modules/demo/demo.module#DemoModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
