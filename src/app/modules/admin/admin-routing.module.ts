import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ADMIN_ROUTES } from './constants/admin-constants';
import { GENERIC_ROUTES } from 'src/app/core/configuration/constants';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { SocietaListComponent } from './pages/societa/societa-list.component';
import { SocietaEditComponent } from './pages/societa/societa-edit.component';


export const routing: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: AdminHomeComponent},
    {path: ADMIN_ROUTES.SOCIETA, 
		children: [
      		{ path: '', redirectTo: GENERIC_ROUTES.LIST, pathMatch: 'full' },
      		{ path: GENERIC_ROUTES.LIST, component: SocietaListComponent },
      		{ path: GENERIC_ROUTES.EDIT, component: SocietaEditComponent },
      		{ path: GENERIC_ROUTES.EDIT + '/:uuid', component: SocietaEditComponent }
    	]
	}
];

@NgModule({
    imports: [RouterModule.forChild(routing)],
    exports: [RouterModule],
})
export class AdminRoutingModule {

}