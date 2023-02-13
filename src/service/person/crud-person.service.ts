import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PersonDialogResp} from "@model/dialog/PersonDialogResp";
import {CrudPersonDialogComponent} from "../../app/dialogue/crud-person/crud-person-dialog.component";
import {Person} from "@model/person/Person";

@Injectable({providedIn: 'root'})
export class CrudPersonService {

  constructor(
    private readonly dialog: MatDialog,
  ) {
  }

  openDialogForCreate(): Promise<PersonDialogResp> {

    const dialogRef = this.dialog.open(CrudPersonDialogComponent, {
      width: '800px',
      height: '400px',
      data: {
        person: new Person(),
        noNeedToConfirm: true,
        isSave: true,
      },
      disableClose: true,
    });

    return dialogRef.afterClosed().toPromise();
  }

  openDialogForEdit(person: Person): Promise<PersonDialogResp> {

    const dialogRef = this.dialog.open(CrudPersonDialogComponent, {
      width: '800px',
      height: '400px',
      data: {
        person: person,
        noNeedToConfirm: false,
        isSave: false,
      },
      disableClose: true,
    });

    return dialogRef.afterClosed().toPromise();
  }

}
