import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FilterController} from "@controller/FilterController";
import {Unsub} from "@util/Unsub";
import {ConfirmationService} from "@service/confirmation/confirmation.service";
import {InputError} from "@model/web/InputError";
import {MarketController} from "@controller/MarketController";
import {Person} from "@model/person/Person";
import {FilterElement} from "@model/filter/FilterElement";
import {FactoryFilterDescription} from "@model/api/production/FactoryFilterDescription";
import {PersonDialogResp} from "@model/dialog/PersonDialogResp";
import {PersonController} from "@controller/PersonController";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";

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

  factoriesToShow: FilterElement[] = [];
  departmentsToShow: FilterElement[] = [];

  currentFactoryId: string = '';
  currentDepartmentId: string = '';

  private currentFactoryIndex: number = 0;
  private currentDepartmentIndex: number = 0;
  private filterDesc: FactoryFilterDescription[] = [];

  private readonly needToConfirm: boolean;
  private readonly isSave: boolean;

  private readonly unsub = new Unsub();

  constructor(
    private dialogRef: MatDialogRef<CrudPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { person: Person, noNeedToConfirm: boolean, isSave: boolean },
    private readonly filterController: FilterController,
    private readonly marketController: MarketController,
    private readonly personController: PersonController,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.person = data.person;
    this.copyPerson = {...data.person};

    this.needToConfirm = !data.noNeedToConfirm;
    this.isSave = data.isSave;
  }

  ngOnInit() {
    this.unsub.sub = this.filterController.loadFactoryFilterDescription().subscribe(
      filterDescription => this.initFirstFilter(filterDescription)
    );

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

  onFactoryChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedFactoryId = elementIds[0];
    const index = this.factoriesToShow.findIndex(x => x.id === selectedFactoryId);

    if (index < 0) {
      throw new Error(`Cannot find factory with ID ${selectedFactoryId}`);
    }

    this.currentFactoryIndex = index;
    this.updateCurrentFactoryId();

    this.currentDepartmentIndex = -1;
    this.updateCurrentDepartmentId();
    this.copyPerson.departmentId = '';

    this.copyPerson.factoryId = selectedFactoryId;
    this.copyPerson.factoryName = this.factoriesToShow[this.currentFactoryIndex].name;
    this.factoryError.hasError = false;
  }

  onDepartmentChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedDepartmentId = elementIds[0];
    const index = this.departmentsToShow.findIndex(x => x.id === selectedDepartmentId);

    if (index < 0) {
      throw new Error(`Cannot find department with ID ${selectedDepartmentId}`);
    }

    this.currentDepartmentIndex = index;
    this.updateCurrentDepartmentId();

    this.copyPerson.departmentId = selectedDepartmentId;
    this.copyPerson.departmentName = this.departmentsToShow[this.currentDepartmentIndex].name;
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
      this.copyPerson.id = await this.personController.createPerson(this.copyPerson).toPromise();
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

  private updateCurrentFactoryId(): void {
    const factory = this.filterDesc[this.currentFactoryIndex];
    this.currentFactoryId = factory.filterElement.id;
    this.departmentsToShow = factory.departments;
  }

  private updateCurrentDepartmentId(): void {
    this.currentDepartmentId = this.departmentsToShow[this.currentDepartmentIndex]?.id || '';
  }

  private initFirstFilter(filterDescriptions: FactoryFilterDescription[]): void {
    if (!filterDescriptions || filterDescriptions.length === 0 || filterDescriptions[0].departments.length === 0) {
      throw new Error('Cannot found any factory or department');
    }

    this.filterDesc = filterDescriptions;
    this.factoriesToShow = filterDescriptions.map(x => x.filterElement);

    this.updateCurrentFactoryId();
    this.updateCurrentDepartmentId();
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
