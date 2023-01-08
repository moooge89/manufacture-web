import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "@model/api/Department";
import {Person} from "@model/person/Person";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DepartmentController} from "@controller/DepartmentController";
import {parseDepartmentId} from "@util/RegexUtil";
import {Unsub} from "@util/Unsub";
import {PersonDialogComponent} from "../../dialogue/person/person-dialog.component";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  departments: Department[] = [];

  draggableMode: boolean = true;

  private dialogRef: MatDialogRef<PersonDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly departmentController: DepartmentController) {
  }

  ngOnInit() {
    this.unsub.sub = this.departmentController.loadDepartments().subscribe(deps => this.departments = deps);
  }

  ngOnDestroy() {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
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
