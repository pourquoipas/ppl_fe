import { HR_ROUTES } from './conf/hr.const';
import { GENERIC_ROUTES } from 'src/app/core/configuration/constants';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersoneListComponent } from './pages/persone/persone-list.component';
import { PersoneEditComponent } from './pages/persone/persone-edit.component';

const routes: Routes = [
    {path: HR_ROUTES.PERSONE, 
		children: [
      		{ path: '', redirectTo: GENERIC_ROUTES.LIST, pathMatch: 'full' },
      		{ path: GENERIC_ROUTES.LIST, component: PersoneListComponent },
      		{ path: GENERIC_ROUTES.EDIT, component: PersoneEditComponent },
      		{ path: GENERIC_ROUTES.EDIT + '/:uuid', component: PersoneEditComponent }
    	]
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
	