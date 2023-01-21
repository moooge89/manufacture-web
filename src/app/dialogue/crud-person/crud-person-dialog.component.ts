import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Unsub} from "@util/Unsub";
import {ConfirmationService} from "@service/confirmation/confirmation.service";
import {InputError} from "@model/web/InputError";
import {Person} from "@model/person/Person";
import {FilterElement} from "@model/filter/FilterElement";
import {PersonDialogResp} from "@model/dialog/PersonDialogResp";
import {PersonController} from "@controller/PersonController";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {Cache} from "@util/Cache";
import {FactoryController} from "@controller/FactoryController";
import {DepartmentController} from "@controller/DepartmentController";

@Component({
  selector: 'app-crud-person-dialog',
  templateUrl: './crud-person-dialog.component.html',
  styleUrls: ['./crud-person-dialog.component.scss'],
})
export class CrudPersonDialogComponent implements OnInit, OnDestroy {

  person: Person;
  copyPerson: Person;

  nameError: InputError = {hasError: false, errorText: ''};
  factoryError: InputError = {hasError: false, errorText: ''};
  departmentError: InputError = {hasError: false, errorText: ''};

  factories: FilterElement[] = [];
  departments: FilterElement[] = [];

  private readonly needToConfirm: boolean;
  private readonly isSave: boolean;

  private readonly cache = new Cache<FilterElement[]>();
  private readonly unsub = new Unsub();

  constructor(
    private dialogRef: MatDialogRef<CrudPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { person: Person, noNeedToConfirm: boolean, isSave: boolean },
    private readonly personController: PersonController,
    private readonly factoryController: FactoryController,
    private readonly confirmationService: ConfirmationService,
    private readonly departmentController: DepartmentController,
  ) {
    this.person = data.person;
    this.copyPerson = {...data.person};

    this.needToConfirm = !data.noNeedToConfirm;
    this.isSave = data.isSave;
  }

  ngOnInit() {
    this.unsub.sub = this.factoryController.loadFactoriesAsFilterElements().subscribe(factories => this.factories = factories);

    const factoryId = this.copyPerson.factoryId;

    if (factoryId) {
      this.cache.computeIfAbsent(factoryId, this.departmentsPromise(factoryId)).then(departments => this.departments = departments);
    }

    this.unsub.sub = this.dialogRef.backdropClick().subscribe(() => this.cancel());
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  @HostListener('window:keyup.esc')
  async onKeyUp() {
    await this.cancel();
  }

  getId = getIdFromFe;

  getName = getNameFromFe;

  onNameChange(name: string): void {
    this.copyPerson.name = name;
    this.nameError.hasError = false;
  }

  async onFactoryChange(elements: FilterElement[]): Promise<void> {
    if (elements?.length === 0) return;

    const selectedFactory = elements[0];

    this.copyPerson.factoryId = selectedFactory.id;
    this.copyPerson.factoryName = selectedFactory.name;

    this.departments = await this.cache.computeIfAbsent(selectedFactory.id, this.departmentsPromise(selectedFactory.id));

    this.copyPerson.departmentId = '';
    this.copyPerson.departmentName = '';

    this.factoryError.hasError = false;
  }

  onDepartmentChange(elements: FilterElement[]): void {
    if (elements?.length === 0) return;

    const selectedDepartment = elements[0];

    this.copyPerson.departmentId = selectedDepartment.id;
    this.copyPerson.departmentName = selectedDepartment.name;

    this.departmentError.hasError = false;
  }

  async cancel() {

    if (!this.hasChanged) {
      this.closeDialog({needToSave: false, person: undefined});
      return;
    }

    const res = await this.getConfirmation();

    if (!res) {
      return;
    }

    this.closeDialog({needToSave: false, person: undefined});
  }

  async save() {

    if (!this.validate()) {
      return;
    }

    if (!this.hasChanged) {
      this.closeDialog({needToSave: false, person: undefined});
      return;
    }

    const res = await this.getConfirmation();

    if (!res) {
      return;
    }

    if (this.isSave) {
      this.copyPerson = await this.personController.createPerson(this.copyPerson).toPromise();
    } else {
      await this.personController.updatePerson(this.copyPerson).toPromise();
    }

    this.closeDialog({needToSave: true, person: this.copyPerson});
  }

  private async getConfirmation() {
    if (this.needToConfirm) {
      return await this.confirmationService.confirm();
    }

    return true;
  }

  private validate(): boolean {

    let isValid = true;

    if (!this.copyPerson.name) {
      this.nameError.hasError = true;
      this.nameError.errorText = 'Name is blank';
      isValid = false;
    }

    if (!this.copyPerson.factoryId) {
      this.factoryError.hasError = true;
      this.factoryError.errorText = 'Choose factory';
      isValid = false;
    }

    if (!this.copyPerson.departmentId) {
      this.departmentError.hasError = true;
      this.departmentError.errorText = 'Choose department';
      isValid = false;
    }

    return isValid;
  }

  private departmentsPromise(factoryId: string): Promise<FilterElement[]> {
    return this.departmentController.loadDepartmentsOfFactoryAsFilterElements(factoryId).toPromise();
  }

  private closeDialog(dialogRes: PersonDialogResp): void {
    this.dialogRef?.close(dialogRes);
  }

  get hasChanged(): boolean {
    return this.person.name !== this.copyPerson.name
      || this.person.factoryId !== this.copyPerson.factoryId
      || this.person.departmentId !== this.copyPerson.departmentId;
  }

}
