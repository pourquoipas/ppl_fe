import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routing: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: AdminHomeComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routing)],
    exports: [RouterModule],
})
export class AdminRoutingModule {

}