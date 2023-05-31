import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MapsRoutingModule } from './maps-routing/maps-routing.module';
import { MaterialModule } from '../material/material.module';
import { PipicanMapsComponent } from './components/pipican-maps/pipican-maps.component';
import { PipicanInfoComponent } from './components/pipican-info/pipican-info.component';



@NgModule({
  declarations: [
    PipicanMapsComponent,
    PipicanInfoComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    NgbCarouselModule,
    MaterialModule
  ]
})
export class MapsModule { }
