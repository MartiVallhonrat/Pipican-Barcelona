import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { PipicanMapsComponent } from '../components/pipican-maps/pipican-maps.component';
import { PipicanInfoComponent } from '../components/pipican-info/pipican-info.component';
import { AuthGuardService } from 'src/app/helpers/auth-guard.service';

const routes : Routes = [
  { path: "", component: PipicanMapsComponent, canActivate:[AuthGuardService]},
  { path: "info/:id", component: PipicanInfoComponent, canActivate:[AuthGuardService]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }