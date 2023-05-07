import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confimation-dialog',
  templateUrl: './confimation-dialog.component.html',
  styleUrls: ['./confimation-dialog.component.scss']
})
export class ConfimationDialogComponent {

  constructor(private dialog: MatDialogRef<ConfimationDialogComponent>) { }

  closeDialog(): void {
    this.dialog.close(false);
  }
  confirmed(): void {
    this.dialog.close(true);
  }
}
