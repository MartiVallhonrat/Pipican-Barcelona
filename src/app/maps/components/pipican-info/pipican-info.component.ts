import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RatingSnackbarComponent } from './snackbars/rating-snackbar/rating-snackbar.component';
import { PhotoSnackbarComponent } from './snackbars/photo-snackbar/photo-snackbar.component';
import { PipicansServiceService } from '../../services/pipicans-service.service';
import { ActivatedRoute } from '@angular/router';
import { Pipicans } from '../../interfaces/pipicans';

@Component({
  selector: 'app-pipican-info',
  templateUrl: './pipican-info.component.html',
  styleUrls: ['./pipican-info.component.scss']
})
export class PipicanInfoComponent {

  pipican?: Pipicans;
  images: string[] = ["../../../assets/pipican-carousel-1.jpg", "../../../assets/pipican-carousel-2.jpg", "../../../assets/pipican-carousel-3.jpg"];
  currentRate!: number;

  constructor
  (
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private pipicansService: PipicansServiceService,
    private route: ActivatedRoute
  ) 
  {
    this.pipicansService.getItemById(this.route.snapshot.params["id"])
      .subscribe(pipican => {
        this.pipican = pipican;
        if( pipican.countRating == 0) {
          this.currentRate = 0;
        } else {
          this.currentRate = pipican.totalRating / pipican.countRating;
        }
        if(pipican.images.length == 1) {
          this.images = [ pipican.images[Math.floor(Math.random() * (pipican.images.length - 1))], "../../../assets/pipican-carousel-1.jpg", "../../../assets/pipican-carousel-2.jpg" ];
        }
        if(pipican.images.length == 2) {
          this.images = [ pipican.images[Math.floor(Math.random() * (pipican.images.length - 1))], pipican.images[Math.floor(Math.random() * (pipican.images.length - 1))], "../../../assets/pipican-carousel-1.jpg" ];
        }
        if(pipican.images.length >= 3) {
          this.images = [ pipican.images[Math.floor(Math.random() * (pipican.images.length - 1))], pipican.images[Math.floor(Math.random() * (pipican.images.length - 1))], pipican.images[Math.floor(Math.random() * (pipican.images.length - 1))] ];
        }

      });
  }

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

  onSelectFile(e: any) {
    this.pipicansService.onSelectFile(e);
    this.snackBar.openFromComponent(PhotoSnackbarComponent, {duration: 2000, panelClass: "success-snackbar"});
  }
}
