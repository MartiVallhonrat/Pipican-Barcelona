import { Component, inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-custom-snackbar2',
  templateUrl: './custom-snackbar2.component.html',
  styleUrls: ['./custom-snackbar2.component.scss']
})
export class CustomSnackbar2Component {
  snackBarRef = inject(MatSnackBarRef);
}
