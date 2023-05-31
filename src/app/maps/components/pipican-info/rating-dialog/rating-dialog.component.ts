import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent {

  constructor(private dialog: MatDialogRef<RatingDialogComponent>) { }

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
    this.dialog.close(true);
  }
}
