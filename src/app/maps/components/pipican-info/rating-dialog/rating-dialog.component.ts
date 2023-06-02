import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { PipicansServiceService } from 'src/app/maps/services/pipicans-service.service';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent {

  constructor(private dialog: MatDialogRef<RatingDialogComponent>,
    private pipicanService: PipicansServiceService ) { }

  ctrl = new FormControl<number | null>(null, Validators.required);
  error: boolean = false;

  closeDialog(): void {
    this.dialog.close(false);
  }
  confirmed(): void {
    if(this.ctrl.invalid) {
      this.error = true;
      return
    }
    this.pipicanService.updateRating(this.ctrl.value);
    this.dialog.close(true);
  }
}
