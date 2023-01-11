import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {MaterialFilterMetaInfo} from "@model/filter/MaterialFilterMetaInfo";
import {emptyPersonFilter} from "@util/FilterUtil";
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
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-crud-person',
  templateUrl: './crud-person.component.html',
  styleUrls: ['./crud-person.component.scss']
})
export class CrudPersonComponent implements OnInit, OnDestroy {

  persons$ = this.personController.loadPersons(emptyPersonFilter());

  panelOpenState = false;

  filterMetaInfo: MaterialFilterMetaInfo = {
    useAvailable: false,
    useCountries: true,
    useDepartments: false,
    useMaterialName: true,
    usePrice: true,
  };

  personUpsert = new EventEmitter<Person>();

  descriptions: FilterDescription[] = [];

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

  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  getId = (element: FilterElement) => element.id;

  getName = (element: FilterElement) => element.name;

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

  private onNameChange(value: string): void {
    console.log('name changed to', value);
  }

  private onFactoryChange(selectedIds: string[]): void {
    console.log('factory changed to', selectedIds)
  }

  private onDepartmentChange(selectedIds: string[]): void {
    console.log('department changed to', selectedIds)
  }

  get headers(): string[] {
    return ['Name', 'Factory', 'Department'];
  }

  get columnNames(): string[] {
    return ['name', 'factoryName', 'departmentName'];
  }

}
