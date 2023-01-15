import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {FilterElement} from "@model/filter/FilterElement";
import {PersonController} from "@controller/PersonController";
import {Person} from "@model/person/Person";
import {CrudPersonService} from "@service/person/crud-person.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CrudPersonDialogComponent} from "../../dialogue/crud-person/crud-person-dialog.component";
import {PersonFilter} from "@model/filter/PersonFilter";
import {FilterDescription} from "@model/filter/FilterDescription";
import {FilterInputDescription} from "@model/filter/FilterInputDescription";
import {FilterFieldType} from "@model/filter/FilterFieldType";
import {FilterDropdownDescription} from "@model/filter/FilterDropdownDescription";
import {Unsub} from "@util/Unsub";
import {FactoryController} from "@controller/FactoryController";
import {DepartmentController} from "@controller/DepartmentController";
import {debounceTime, filter, map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {forkJoin, Subject} from "rxjs";
import {PersonFilterReactor} from "@model/filter/reactor/PersonFilterReactor";

@Component({
  selector: 'app-crud-person',
  templateUrl: './crud-person.component.html',
  styleUrls: ['./crud-person.component.scss']
})
export class CrudPersonComponent implements OnInit, OnDestroy {

  persons$ = this.personController.loadPersons(new PersonFilter());

  panelOpenState = false;

  personUpsert = new EventEmitter<Person>();

  descriptions: FilterDescription[] = [];

  private readonly filterChangedSubject = new Subject<PersonFilter>();
  private readonly filterReactor = new PersonFilterReactor(this.filterChangedSubject);

  private dialogRef: MatDialogRef<CrudPersonDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly personController: PersonController,
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

    this.unsub.sub = forkJoin([factories$, departments$]).subscribe(
      ([factories, departments]) => this.initDescriptions(factories, departments)
    );

    this.unsub.sub = this.filterChangedSubject.pipe(
      filter(x => !!x),
      debounceTime(300),
    ).subscribe(filter => this.persons$ = this.personController.loadPersons(filter));

  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
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
      onValueChange: this.filterReactor.onNameChange,
    };

    const factoryDesc: FilterDropdownDescription<FilterElement> = {
      elements: factories,
      fieldType: FilterFieldType.DROPDOWN,
      getId: this.getId,
      getName: this.getName,
      label: 'Factory...',
      onValueChange: this.filterReactor.onFactoriesChange,
    };

    const departmentDesc: FilterDropdownDescription<FilterElement> = {
      elements: departments,
      fieldType: FilterFieldType.DROPDOWN,
      getId: this.getId,
      getName: this.getName,
      label: 'Department...',
      onValueChange: this.filterReactor.onDepartmentsChange,
    };

    this.descriptions.push(nameDesc, factoryDesc, departmentDesc);
  }

  get headers(): string[] {
    return ['Name', 'Factory', 'Department'];
  }

  get columnNames(): string[] {
    return ['name', 'factoryName', 'departmentName'];
  }

}
