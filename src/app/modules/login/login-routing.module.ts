import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandSocietaComponent } from './pages/landing/land-societa.component';
import { GENERIC_ROUTES } from 'src/app/core/configuration/constants';
import { HomeComponent } from './pages/landing/home.component';


const routes: Routes = [
	{ path: '', redirectTo: 'landsocieta', pathMatch: 'full' },
	{ path: 'landsocieta', component: LandSocietaComponent },
	{ path: GENERIC_ROUTES.LANDING_PAGE, component: HomeComponent },

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LoginRoutingModule { }
