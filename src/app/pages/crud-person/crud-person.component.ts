import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {emptyPersonFilter, getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {FilterElement} from "@model/filter/FilterElement";
import {PersonController} from "@controller/PersonController";
import {Person} from "@model/person/Person";
import {CrudPersonService} from "@service/person/crud-person.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CrudPersonDialogComponent} from "../../dialogue/crud-person/crud-person-dialog.component";
import {PersonFilter} from "@model/person/PersonFilter";
import {FilterDescription} from "@model/filter/FilterDescription";
import {FilterInputDescription} from "@model/filter/FilterInputDescription";
import {FilterFieldType} from "@model/filter/FilterFieldType";
import {FilterDropdownDescription} from "@model/filter/FilterDropdownDescription";
import {FilterController} from "@controller/FilterController";
import {Unsub} from "@util/Unsub";
import {FactoryController} from "@controller/FactoryController";
import {DepartmentController} from "@controller/DepartmentController";
import {debounceTime, filter, map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {forkJoin, Subject} from "rxjs";

@Component({
  selector: 'app-crud-person',
  templateUrl: './crud-person.component.html',
  styleUrls: ['./crud-person.component.scss']
})
export class CrudPersonComponent implements OnInit, OnDestroy {

  persons$ = this.personController.loadPersons(emptyPersonFilter());

  panelOpenState = false;

  personUpsert = new EventEmitter<Person>();

  descriptions: FilterDescription[] = [];

  private filterChangedSubject = new Subject<PersonFilter>();

  private filter: PersonFilter = emptyPersonFilter();

  private dialogRef: MatDialogRef<CrudPersonDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly personController: PersonController,
              private readonly filterController: FilterController,
              private readonly factoryController: FactoryController,
              private readonly crudPersonService: CrudPersonService,
              private readonly departmentController: DepartmentController,) {
  }

  ngOnInit(): void {

    const factories$: Observable<FilterElement[]> = this.factoryController.loadFactories().pipe(
      map(factories => factories.map(factory => {
        return {
          id: factory.id,
          name: factory.name
        } as FilterElement
      })),
    );

    const departments$: Observable<FilterElement[]> = this.departmentController.loadDepartments().pipe(
      map(departments => departments.map(department => {
        return {
          id: department.id,
          name: department.name
        } as FilterElement
      })),
    );

    this.unsub.sub = forkJoin([factories$, departments$]).subscribe(([factories, departments]) => {
      this.initDescriptions(factories, departments);
    });

    this.filterChangedSubject.pipe(
      filter(x => !!x),
      debounceTime(300),
    ).subscribe(filter => this.persons$ = this.personController.loadPersons(filter))

  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  getId = getIdFromFe;

  getName = getNameFromFe;

  deletePersons$ = (ids: Set<string>) => this.personController.deletePersons(ids);

  async onRowAddClick(): Promise<void> {
    const resp = await this.crudPersonService.openDialogForCreate();

    if (!resp.needToSave) {
      return;
    }

    this.personUpsert.next(resp.person);
  }

  async onRowClick(person: Person): Promise<void> {

    const resp = await this.crudPersonService.openDialogForEdit(person);

    if (!resp.needToSave) {
      return;
    }

    this.personUpsert.next(resp.person);
  }

  private initDescriptions(factories: FilterElement[], departments: FilterElement[]): void {
    const nameDesc: FilterInputDescription = {
      fieldType: FilterFieldType.INPUT,
      placeholder: 'Name...',
      onValueChange: this.onNameChange,
    };

    const factoryDesc: FilterDropdownDescription<FilterElement> = {
      elements: factories,
      fieldType: FilterFieldType.DROPDOWN,
      getId: this.getId,
      getName: this.getName,
      label: 'Factory...',
      onValueChange: this.onFactoryChange,
    };

    const departmentDesc: FilterDropdownDescription<FilterElement> = {
      elements: departments,
      fieldType: FilterFieldType.DROPDOWN,
      getId: this.getId,
      getName: this.getName,
      label: 'Department...',
      onValueChange: this.onDepartmentChange,
    };

    this.descriptions.push(nameDesc, factoryDesc, departmentDesc);
  }

  private onNameChange = (value: string): void => {
    this.filter.personName = value;
    this.filterChangedSubject.next(this.filter);
  };

  private onFactoryChange = (selectedIds: string[]): void => {
    this.filter.factoryIds = selectedIds;
    this.filterChangedSubject.next(this.filter);
  }

  private onDepartmentChange = (selectedIds: string[]): void => {
    this.filter.departmentIds = selectedIds;
    this.filterChangedSubject.next(this.filter);
  }

  get headers(): string[] {
    return ['Name', 'Factory', 'Department'];
  }

  get columnNames(): string[] {
    return ['name', 'factoryName', 'departmentName'];
  }

}
