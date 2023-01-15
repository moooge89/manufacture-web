import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PersonController} from "@controller/PersonController";
import {Person} from "@model/person/Person";
import {PersonDialogComponent} from "../../dialogue/person/person-dialog.component";
import {FilterDescription} from "@model/filter/FilterDescription";
import {PersonFilter} from "@model/filter/PersonFilter";
import {FilterElement} from "@model/filter/FilterElement";
import {FilterInputDescription} from "@model/filter/FilterInputDescription";
import {FilterFieldType} from "@model/filter/FilterFieldType";
import {FilterDropdownDescription} from "@model/filter/FilterDropdownDescription";
import {Subject} from "rxjs";
import {PersonFilterReactor} from "@model/filter/reactor/PersonFilterReactor";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {Unsub} from "@util/Unsub";
import {debounceTime, filter} from "rxjs/operators";
import {FactoryController} from "@controller/FactoryController";
import {DepartmentController} from "@controller/DepartmentController";

@Component({
  selector: 'app-user',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {

  persons$ = this.personController.loadPersons(new PersonFilter());

  panelOpenState = false;

  descriptions: FilterDescription[] = [];

  private readonly filterChangedSubject = new Subject<PersonFilter>();
  private readonly filterReactor = new PersonFilterReactor(this.filterChangedSubject);

  private dialogRef: MatDialogRef<PersonDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly personController: PersonController,
              private readonly factoryController: FactoryController,
              private readonly departmentController: DepartmentController,) {
  }

  ngOnInit() {

    this.initDescriptions();

    this.unsub.sub = this.filterChangedSubject.pipe(
      filter(x => !!x),
      debounceTime(300),
    ).subscribe(filter => this.persons$ = this.personController.loadPersons(filter));

  }

  ngOnDestroy() {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
  }

  handlePersonClick(person: Person): void {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '720px',
      height: '320px',
      data: {person: person},
    });
  }

  private initDescriptions(): void {
    const nameDesc: FilterInputDescription = {
      fieldType: FilterFieldType.INPUT,
      placeholder: 'Name...',
      onValueChange: this.filterReactor.onNameChange,
    };

    const factoryDesc: FilterDropdownDescription<FilterElement> = {
      elements$: this.factoryController.loadFactoriesAsFilterElements(),
      fieldType: FilterFieldType.DROPDOWN,
      getId: getIdFromFe,
      getName: getNameFromFe,
      label: 'Factory...',
      onValueChange: this.filterReactor.onFactoriesChange,
    };

    const departmentDesc: FilterDropdownDescription<FilterElement> = {
      elements$: this.departmentController.loadDepartmentsAsFilterElements(),
      fieldType: FilterFieldType.DROPDOWN,
      getId: getIdFromFe,
      getName: getNameFromFe,
      label: 'Department...',
      onValueChange: this.filterReactor.onDepartmentsChange,
    };

    this.descriptions.push(nameDesc, factoryDesc, departmentDesc);
  }

  // todo era hide factory and department if needed
  get headers(): string[] {
    return ['Name', 'Factory', 'Department'];
  }

  // todo era hide factory and department if needed
  get columnNames(): string[] {
    return ['name', 'factoryName', 'departmentName'];
  }

}
