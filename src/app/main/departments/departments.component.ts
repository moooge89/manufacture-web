import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "@model/api/Department";
import {Person} from "@model/api/Person";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PersonDialogComponent} from "@shared/person-dialog/person-dialog.component";
import {DepartmentController} from "@controller/DepartmentController";
import {parseDepartmentId} from "@util/RegexUtil";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  departments: Department[] = [];

  draggableMode: boolean = true;

  private dialogRef: MatDialogRef<PersonDialogComponent> | undefined;

  constructor(private readonly dialog: MatDialog,
              private readonly departmentController: DepartmentController) {
  }

  ngOnInit() {
    // todo era get departments from controller
    for (let i = 0; i < 5; ++i) {
      const department = this.rndDepartment(i + 1);

      for (let i = 0; i < 3; ++i) {
        this.addRndPerson(department, i + 1);
      }

      this.departments.push(department);
    }
  }

  ngOnDestroy() {
    this.dialogRef?.close();
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

  drop(item: CdkDragDrop<any, any>): void {
    if (item.container.id === item.previousContainer.id) {
      this.handleIndexChange(item);
    } else {
      this.handleContainerChange(item);
    }
  }

  openPersonDialog(person: Person) {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '720px',
      height: '320px',
      data: {material: person},
    });
  }

  private handleIndexChange(item: CdkDragDrop<any, any>): void {
    if (item.currentIndex === item.previousIndex) {
      return;
    }

    const personToBeMoved: Person = item.container.data[item.previousIndex];

    // noinspection JSMismatchedCollectionQueryUpdate
    const persons: Person[] = item.container.data;

    persons.splice(item.previousIndex, 1);
    persons.splice(item.currentIndex, 0, personToBeMoved);
  }

  private handleContainerChange(item: CdkDragDrop<any, any>): void {
    const personToBeMoved: Person = item.previousContainer.data[item.previousIndex];

    // noinspection JSMismatchedCollectionQueryUpdate
    const oldPersons: Person[] = item.previousContainer.data;
    // noinspection JSMismatchedCollectionQueryUpdate
    const newPersons: Person[] = item.container.data;

    oldPersons.splice(item.previousIndex, 1);
    newPersons.splice(item.currentIndex, 0, personToBeMoved);

    const departmentId = parseDepartmentId(item.container.id);

    this.departmentController.changePersonDepartment(personToBeMoved.id, departmentId);
  }

  get isDraggingDisabled(): boolean {
    return !this.draggableMode;
  }

}
