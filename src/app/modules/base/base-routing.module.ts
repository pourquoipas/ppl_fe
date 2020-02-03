import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GENERIC_ROUTES } from 'src/app/core/configuration/constants';
import { BASE_ROUTES } from './conf/base.const';
import { StatiListComponent } from './pages/stato/stati-list.component';
import { StatiEditComponent } from './pages/stato/stati-edit.component';
import { StatifederatiListComponent } from './pages/statofederato/statifederati-list.component';
import { StatifederatiEditComponent } from './pages/statofederato/statifederati-edit.component';
import { RegioniListComponent } from './pages/regione/regioni-list.component';
import { RegioniEditComponent } from './pages/regione/regioni-edit.component';
import { ProvinceListComponent } from './pages/provincia/province-list.component';
import { ProvinceEditComponent } from './pages/provincia/province-edit.component';
import { ComuniListComponent } from './pages/comune/comuni-list.component';
import { ComuniEditComponent } from './pages/comune/comuni-edit.component';
import { TitoliStudioEditComponent } from './pages/titolostudio/titoli-studio-edit.component';
import { TitoliStudioListComponent } from './pages/titolostudio/titoli-studio-list.component';


const routes: Routes = [
    {path: BASE_ROUTES.STATI, 
		children: [
      		{ path: '', redirectTo: GENERIC_ROUTES.LIST, pathMatch: 'full' },
      		{ path: GENERIC_ROUTES.LIST, component: StatiListComponent },
      		{ path: GENERIC_ROUTES.EDIT, component: StatiEditComponent },
      		{ path: GENERIC_ROUTES.EDIT + '/:uuid', component: StatiEditComponent }
    	]
	},
    {path: BASE_ROUTES.STATIFEDERATI, 
		children: [
      		{ path: '', redirectTo: GENERIC_ROUTES.LIST, pathMatch: 'full' },
      		{ path: GENERIC_ROUTES.LIST, component: StatifederatiListComponent },
      		{ path: GENERIC_ROUTES.EDIT, component: StatifederatiEditComponent },
      		{ path: GENERIC_ROUTES.EDIT + '/:uuid', component: StatifederatiEditComponent }
    	]
	},
    {path: BASE_ROUTES.REGIONI, 
		children: [
      		{ path: '', redirectTo: GENERIC_ROUTES.LIST, pathMatch: 'full' },
      		{ path: GENERIC_ROUTES.LIST, component: RegioniListComponent },
      		{ path: GENERIC_ROUTES.EDIT, component: RegioniEditComponent },
      		{ path: GENERIC_ROUTES.EDIT + '/:uuid', component: RegioniEditComponent }
    	]
	},
    {path: BASE_ROUTES.PROVINCE, 
		children: [
      		{ path: '', redirectTo: GENERIC_ROUTES.LIST, pathMatch: 'full' },
      		{ path: GENERIC_ROUTES.LIST, component: ProvinceListComponent },
      		{ path: GENERIC_ROUTES.EDIT, component: ProvinceEditComponent },
      		{ path: GENERIC_ROUTES.EDIT + '/:uuid', component: ProvinceEditComponent }
    	]
	},
    {path: BASE_ROUTES.COMUNI, 
		children: [
      		{ path: '', redirectTo: GENERIC_ROUTES.LIST, pathMatch: 'full' },
      		{ path: GENERIC_ROUTES.LIST, component: ComuniListComponent },
      		{ path: GENERIC_ROUTES.EDIT, component: ComuniEditComponent },
      		{ path: GENERIC_ROUTES.EDIT + '/:uuid', component: ComuniEditComponent }
    	]
	},
    {path: BASE_ROUTES.TITOLISTUDIO, 
		children: [
      		{ path: '', redirectTo: GENERIC_ROUTES.LIST, pathMatch: 'full' },
      		{ path: GENERIC_ROUTES.LIST, component: TitoliStudioListComponent },
      		{ path: GENERIC_ROUTES.EDIT, component: TitoliStudioEditComponent },
      		{ path: GENERIC_ROUTES.EDIT + '/:uuid', component: TitoliStudioEditComponent }
    	]
	}
	
	
	

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
