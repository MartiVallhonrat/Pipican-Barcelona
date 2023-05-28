import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipicanMapsComponent } from './components/pipican-maps/pipican-maps.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    PipicanMapsComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PipicanMapsComponent
  ]
})
export class MapsModule { }
