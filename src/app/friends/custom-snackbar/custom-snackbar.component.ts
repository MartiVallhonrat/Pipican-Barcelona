import { Component, inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
