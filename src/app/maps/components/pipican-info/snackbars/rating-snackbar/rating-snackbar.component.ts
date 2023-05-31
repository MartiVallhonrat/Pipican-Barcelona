import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rating-snackbar',
  templateUrl: './rating-snackbar.component.html',
  styleUrls: ['./rating-snackbar.component.scss']
})
export class RatingSnackbarComponent {

  snackBarRef = inject(MatSnackBarRef);
}
