import {Component, OnDestroy} from '@angular/core';
import {emptyUserFilter} from "@util/FilterUtil";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PersonController} from "@controller/PersonController";
import {Person} from "@model/person/Person";
import {PersonDialogComponent} from "../../dialogue/person/person-dialog.component";

@Component({
  selector: 'app-user',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnDestroy {

  persons$ = this.personController.loadPersons(emptyUserFilter());

  panelOpenState = false;

  private dialogRef: MatDialogRef<PersonDialogComponent> | undefined;

  constructor(private readonly dialog: MatDialog,
              private readonly personController: PersonController) {
  }

  ngOnDestroy() {
    this.dialogRef?.close();
  }

  handlePersonClick(person: Person): void {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '720px',
      height: '320px',
      data: {material: person},
    });
  }

  get headers(): string[] {
    return ['Name', 'Factory', 'Department'];
  }

  get columnNames(): string[] {
    return ['name', 'factoryName', 'departmentName'];
  }

}
