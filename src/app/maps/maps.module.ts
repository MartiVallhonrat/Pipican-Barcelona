import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MapsRoutingModule } from './maps-routing/maps-routing.module';
import { MaterialModule } from '../material/material.module';
import { PipicanMapsComponent } from './components/pipican-maps/pipican-maps.component';
import { PipicanInfoComponent } from './components/pipican-info/pipican-info.component';
import { RatingDialogComponent } from './components/pipican-info/rating-dialog/rating-dialog.component';
import { RatingSnackbarComponent } from './components/pipican-info/snackbars/rating-snackbar/rating-snackbar.component';
import { PhotoSnackbarComponent } from './components/pipican-info/snackbars/photo-snackbar/photo-snackbar.component';
import { NotificationSnackbarComponent } from './components/pipican-info/snackbars/notification-snackbar/notification-snackbar.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PipicanMapsComponent,
    PipicanInfoComponent,
    RatingDialogComponent,
    RatingSnackbarComponent,
    PhotoSnackbarComponent,
    NotificationSnackbarComponent,
  ],
  imports: [
    CommonModule,
    NgIf,
    MapsRoutingModule,
    NgbCarouselModule,
    NgbRatingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MapsModule { }
