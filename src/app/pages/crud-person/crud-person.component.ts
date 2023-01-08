import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {MaterialFilterMetaInfo} from "@model/filter/MaterialFilterMetaInfo";
import {emptyPersonFilter} from "@util/FilterUtil";
import {FilterElement} from "@model/filter/FilterElement";
import {PersonController} from "@controller/PersonController";
import {Person} from "@model/person/Person";
import {CrudPersonService} from "@service/person/crud-person.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CrudPersonDialogComponent} from "../../dialogue/crud-person/crud-person-dialog.component";

@Component({
  selector: 'app-crud-person',
  templateUrl: './crud-person.component.html',
  styleUrls: ['./crud-person.component.scss']
})
export class CrudPersonComponent implements OnDestroy {

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

  private dialogRef: MatDialogRef<CrudPersonDialogComponent> | undefined;

  constructor(private readonly personController: PersonController,
              private readonly crudPersonService: CrudPersonService,) {
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  getId = (element: FilterElement) => element.id;

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

  get headers(): string[] {
    return ['Name', 'Factory', 'Department'];
  }

  get columnNames(): string[] {
    return ['name', 'factoryName', 'departmentName'];
  }

}
