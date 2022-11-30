import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {

  message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string },
  ) {
    this.message = data.message;
  }

  no(): void {
    this.dialogRef?.close(false);
  }

  yes(): void {
    this.dialogRef?.close(true);
  }

}
