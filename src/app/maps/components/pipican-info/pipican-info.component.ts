import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RatingSnackbarComponent } from './snackbars/rating-snackbar/rating-snackbar.component';

@Component({
  selector: 'app-pipican-info',
  templateUrl: './pipican-info.component.html',
  styleUrls: ['./pipican-info.component.scss']
})
export class PipicanInfoComponent {

  constructor
  (
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  images = ["../../../assets/pipican-carousel-1.jpg", "../../../assets/pipican-carousel-2.jpg", "../../../assets/pipican-carousel-3.jpg"];

  openDialogRating(): void {
    this.dialog
      .open(RatingDialogComponent)
      .afterClosed()
      .subscribe((confirmation: Boolean) => {
        if (confirmation) {
          this.snackBar.openFromComponent(RatingSnackbarComponent, {duration: 2000, panelClass: "success-snackbar"});
        };
      });
  }
}
