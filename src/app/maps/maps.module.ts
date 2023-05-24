import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipicanMapsComponent } from './components/pipican-maps/pipican-maps.component';



@NgModule({
  declarations: [
    PipicanMapsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PipicanMapsComponent
  ]
})
export class MapsModule { }
