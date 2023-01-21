import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "@model/api/Department";
import {Person} from "@model/person/Person";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DepartmentController} from "@controller/DepartmentController";
import {parseDepartmentId} from "@util/RegexUtil";
import {Unsub} from "@util/Unsub";
import {PersonDialogComponent} from "../../dialogue/person/person-dialog.component";
import {ConfirmationService} from "@service/confirmation/confirmation.service";
import {Observable} from "rxjs/internal/Observable";
import {forkJoin} from "rxjs";
import {take} from "rxjs/operators";
import {PersonController} from "@controller/PersonController";
import {PersonFilter} from "@model/filter/PersonFilter";
import {SortType} from "@model/web/SortType";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  departments: Department[] = [];

  draggableMode: boolean = true;
  confirmMode: boolean = false;

  private dialogRef: MatDialogRef<PersonDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly personController: PersonController,
              private readonly confirmationService: ConfirmationService,
              private readonly departmentController: DepartmentController,) {
  }

  ngOnInit() {
    this.unsub.sub = this.departmentController.loadDepartments().subscribe(deps => this.initDepartments(deps));
  }

  ngOnDestroy() {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
  }

  async onDrop(item: CdkDragDrop<any, any>): Promise<void> {

    const updates$ = this.drop(item);

    if (!this.confirmMode) {
      this.commitUpdates(updates$);
      return;
    }

    const confirmed = await this.confirmationService.confirm();

    if (confirmed) {
      this.commitUpdates(updates$);
      return;
    }

    // if user canceled updates, then rollback

    const copyItem: CdkDragDrop<any, any> = {
      item: item.item,
      currentIndex: item.previousIndex,
      previousIndex: item.currentIndex,
      container: item.previousContainer,
      previousContainer: item.container,
      dropPoint: item.dropPoint,
      distance: item.distance,
      isPointerOverContainer: item.isPointerOverContainer,
    };

    this.drop(copyItem);
  }

  openPersonDialog(person: Person) {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '720px',
      height: '320px',
      data: {person: person},
    });
  }

  private drop(item: CdkDragDrop<any, any>): Observable<void>[] {
    if (item.container.id === item.previousContainer.id) {
      return this.handleIndexChange(item);
    } else {
      return this.handleContainerChange(item);
    }
  }

  private handleIndexChange(item: CdkDragDrop<any, any>): Observable<void>[] {
    if (item.currentIndex === item.previousIndex) {
      return [];
    }

    const personToBeMoved: Person = item.container.data[item.previousIndex];

    // noinspection JSMismatchedCollectionQueryUpdate
    const persons: Person[] = item.container.data;

    persons.splice(item.previousIndex, 1);
    persons.splice(item.currentIndex, 0, personToBeMoved);

    return [this.personController.updatePersonIndex(personToBeMoved.id, item.currentIndex)];
  }

  private handleContainerChange(item: CdkDragDrop<any, any>): Observable<void>[] {
    const personToBeMoved: Person = item.previousContainer.data[item.previousIndex];

    // noinspection JSMismatchedCollectionQueryUpdate
    const oldPersons: Person[] = item.previousContainer.data;
    // noinspection JSMismatchedCollectionQueryUpdate
    const newPersons: Person[] = item.container.data;

    oldPersons.splice(item.previousIndex, 1);
    newPersons.splice(item.currentIndex, 0, personToBeMoved);

    const departmentId = parseDepartmentId(item.container.id);

    return [this.departmentController.changePersonDepartment(personToBeMoved.id, departmentId)];
  }

  private commitUpdates(updates$: Observable<void>[]): void {
    if (updates$.length === 0) {
      return;
    }

    forkJoin(updates$).pipe(take(1)).subscribe();
  }

  private initDepartments(departments: Department[]): void {
    this.departments = departments;

    for (let i = 0; i < departments.length; ++i) {
      const personFilter: PersonFilter = {
        departmentIds: [departments[i].id],
        personName: '',
        factoryIds: [],
        sorting: {
          fieldName: '',
          sortType: SortType.ASC,
        }
      };

      this.unsub.sub = this.personController.loadPersons(personFilter).subscribe(persons => this.departments[i].persons = persons);
    }

  }

  get isDraggingDisabled(): boolean {
    return !this.draggableMode;
  }

}
