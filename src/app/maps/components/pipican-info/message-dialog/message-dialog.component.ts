import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { PipicansServiceService } from 'src/app/maps/services/pipicans-service.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  constructor(private dialog: MatDialogRef<MessageDialogComponent>,
    private pipicanService: PipicansServiceService ) { }

  message = new FormControl<string | null>(null);

  closeDialog(): void {
    this.dialog.close(false);
  }
  confirmed(): void {
    this.pipicanService.sendNotifications(this.message.value);
    this.dialog.close(true);
  }
}
