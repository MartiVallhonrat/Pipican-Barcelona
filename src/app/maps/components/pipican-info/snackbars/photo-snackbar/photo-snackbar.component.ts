import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-photo-snackbar',
  templateUrl: './photo-snackbar.component.html',
  styleUrls: ['./photo-snackbar.component.scss']
})
export class PhotoSnackbarComponent {

  snackBarRef = inject(MatSnackBarRef);
}
