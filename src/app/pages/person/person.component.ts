import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PersonController} from "@controller/PersonController";
import {Person} from "@model/person/Person";
import {FilterDescription} from "@model/filter/description/FilterDescription";
import {PersonFilter} from "@model/filter/PersonFilter";
import {FilterElement} from "@model/filter/FilterElement";
import {FilterInputDescription} from "@model/filter/description/FilterInputDescription";
import {FilterDropdownDescription} from "@model/filter/description/FilterDropdownDescription";
import {Subject} from "rxjs";
import {PersonFilterReactor} from "@model/filter/reactor/PersonFilterReactor";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {Unsub} from "@util/Unsub";
import {debounceTime, filter, map} from "rxjs/operators";
import {FactoryController} from "@controller/FactoryController";
import {DepartmentController} from "@controller/DepartmentController";
import {AuthService} from "@service/auth/auth.service";
import {
  PersonFactoryTransferDialogComponent
} from "../../dialogue/person-factory-transfer/person-factory-transfer-dialog.component";
import {PersonDialogComponent} from "../../dialogue/person/person-dialog.component";
import {Sorting} from "@model/web/Sorting";

@Component({
  selector: 'app-user',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {

  persons$ = this.personController.loadPersons(new PersonFilter());

  panelOpenState = false;

  descriptions: FilterDescription[] = [];

  headers: string[] = [];
  columnNames: string[] = [];

  personUpsert = new Subject<Person>();

  private readonly filterChangedSubject = new Subject<PersonFilter>();
  private readonly filterReactor = new PersonFilterReactor(this.filterChangedSubject);

  private dialogRef: MatDialogRef<any> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly authService: AuthService,
              private readonly personController: PersonController,
              private readonly factoryController: FactoryController,
              private readonly departmentController: DepartmentController,) {
  }

  getId = getIdFromFe;

  async ngOnInit() {

    await this.initDescriptions();

    this.unsub.sub = this.filterChangedSubject.pipe(
      filter(x => !!x),
      debounceTime(300),
    ).subscribe(filter => this.persons$ = this.personController.loadPersons(filter));

  }

  ngOnDestroy() {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
  }

  async handlePersonClick(person: Person) {
    this.dialogRef?.close();

    const userInfo = await this.authService.userInfo();

    if (userInfo.isCompanyDirector()) {
      this.dialogRef = this.dialog.open(PersonFactoryTransferDialogComponent, {
        width: '800px',
        height: '400px',
        data: {person: person},
      });

      this.unsub.sub = this.dialogRef.afterClosed().pipe(
        filter(x => !!x && x.needToSave),
        map(x => x.person)
      ).subscribe(person => this.personUpsert.next(person));

    } else {
      this.dialogRef = this.dialog.open(PersonDialogComponent, {
        width: '720px',
        height: '320px',
        data: {person: person},
      });
    }

  }

  onSortClicked(sorting: Sorting): void {
    this.filterReactor.onSortChange(sorting);
  }

  private async initDescriptions() {
    const nameDesc = new FilterInputDescription({
      placeholder: 'Name...',
      defaultValue: '',
      onValueChange: this.filterReactor.onNameChange,
    });

    this.headers.push('Name');
    this.columnNames.push('name');
    this.descriptions.push(nameDesc);

    const userInfo = await this.authService.userInfo();

    if (userInfo.canViewFactory()) {
      const factoryDesc = new FilterDropdownDescription<FilterElement>({
        elements$: this.factoryController.loadFactoriesAsFilterElements(),
        getId: getIdFromFe,
        getName: getNameFromFe,
        label: 'Factory...',
        defaultSelectedDisplayValue: '',
        onValueChange: this.filterReactor.onFactoriesChange,
      });

      this.headers.push('Factory');
      this.columnNames.push('factoryName');
      this.descriptions.push(factoryDesc);
    }

    if (userInfo.canViewDepartment()) {
      const departmentDesc = new FilterDropdownDescription<FilterElement>({
        elements$: this.departmentController.loadDepartmentsAsFilterElements(),
        getId: getIdFromFe,
        getName: getNameFromFe,
        label: 'Department...',
        defaultSelectedDisplayValue: '',
        onValueChange: this.filterReactor.onDepartmentsChange,
      });

      this.headers.push('Department');
      this.columnNames.push('departmentName');
      this.descriptions.push(departmentDesc);
    }

  }

}
