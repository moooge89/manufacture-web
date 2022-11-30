import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../app/dialogue/confirmation/confirmation.component";

@Injectable({providedIn: 'root'})
export class ConfirmationService {

  constructor(
    private readonly dialog: MatDialog,
  ) {}

  confirm(message: string = 'Do you confirm action?'): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      height: '200px',
      data: {message: message},
    });

    return dialogRef.afterClosed().toPromise();
  }

}
