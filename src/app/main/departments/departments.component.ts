import {Component, OnInit} from '@angular/core';
import {Department} from "../../../model/api/Department";
import {Person} from "../../../model/api/Person";
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments: Department[] = [];

  ngOnInit() {
    for (let i = 0; i < 5; ++i) {
      const department = this.rndDepartment(i + 1);

      for (let i = 0; i < 3; ++i) {
        this.addRndPerson(department, i + 1);
      }

      this.departments.push(department);
    }
  }

  rndDepartment = (id: number): Department => {
    return {
      id: id + '',
      name: 'Department ' + id,
      persons: [],
      teamCount: 0,
      workerCount: 0,
    };
  }

  addRndPerson = (department: Department, index: number) => {
    const person: Person = {
      departmentId: department.id,
      id: '',
      name: 'Person ' + department.id + index,
    };

    department.persons.push(person);
  }

  drop(item: CdkDragDrop<any, any>) {
    if (item.container.id === item.previousContainer.id) {
      DepartmentsComponent.handleIndexChange(item);
    } else {
        this.handleContainerChange(item);
    }
  }

  private static handleIndexChange(item: CdkDragDrop<any, any>): void {
    if (item.currentIndex === item.previousIndex) {
      return;
    }

    const personToBeMoved: Person = item.container.data[item.previousIndex];

    // noinspection JSMismatchedCollectionQueryUpdate
    const persons: Person[] = item.container.data;

    persons.splice(item.previousIndex, 1);
    persons.splice(item.currentIndex, 0, personToBeMoved);
  }

  private handleContainerChange(item: CdkDragDrop<any, any>) {
    const personToBeMoved: Person = item.previousContainer.data[item.previousIndex];

    // noinspection JSMismatchedCollectionQueryUpdate
    const oldPersons: Person[] = item.previousContainer.data;
    // noinspection JSMismatchedCollectionQueryUpdate
    const newPersons: Person[] = item.container.data;

    oldPersons.splice(item.previousIndex, 1);
    newPersons.splice(item.currentIndex, 0, personToBeMoved);

    // todo era make request to change department of person here
  }


}
