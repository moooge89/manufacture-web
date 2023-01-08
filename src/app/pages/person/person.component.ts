import {Component} from '@angular/core';
import {emptyUserFilter} from "@util/FilterUtil";
import {MatDialog} from "@angular/material/dialog";
import {PersonController} from "@controller/PersonController";
import {Person} from "@model/person/Person";

@Component({
  selector: 'app-user',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {

  persons$ = this.personController.loadPersons(emptyUserFilter());

  panelOpenState = false;

  constructor(private readonly dialog: MatDialog,
              private readonly personController: PersonController) {
  }

  handlePersonClick(person: Person): void {
    console.log(person);
  }

  get headers(): string[] {
    return ['Name', 'Factory', 'Department'];
  }

  get columnNames(): string[] {
    return ['name', 'factoryName', 'departmentName'];
  }

}
