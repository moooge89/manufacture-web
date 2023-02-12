import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Person} from "@model/person/Person";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {FilterElement} from "@model/filter/FilterElement";
import {Unsub} from "@util/Unsub";
import {FactoryController} from "@controller/FactoryController";
import {PersonDialogResp} from "@model/dialog/PersonDialogResp";
import {ConfirmationService} from "@service/confirmation/confirmation.service";
import {PersonController} from "@controller/PersonController";

@Component({
  selector: 'app-person-factory-transfer-dialog',
  templateUrl: './person-factory-transfer-dialog.component.html',
  styleUrls: ['./person-factory-transfer-dialog.component.scss'],
})
export class PersonFactoryTransferDialogComponent implements OnInit, OnDestroy {

  person: Person;
  copyPerson: Person;

  factories: FilterElement[] = [];

  private isMadeFactoryDirectorClicked: boolean = false;

  private readonly subs = new Unsub();

  constructor(
    private dialogRef: MatDialogRef<PersonFactoryTransferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { person: Person },
    private readonly personController: PersonController,
    private readonly factoryController: FactoryController,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.person = data.person;
    this.copyPerson = {...data.person};
  }

  ngOnInit() {
    this.subs.sub = this.factoryController.loadFactoriesAsFilterElements().subscribe(factories => this.factories = factories);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  @HostListener('window:keyup.esc')
  async onKeyUp() {
    await this.cancel();
  }

  getId = getIdFromFe;

  getName = getNameFromFe;

  onFactoryChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedFactoryId = elementIds[0];
    const index = this.factories.findIndex(x => x.id === selectedFactoryId);

    if (index < 0) {
      throw new Error(`Cannot find factory with ID ${selectedFactoryId}`);
    }

    const factory = this.factories[index];

    this.copyPerson.factoryId = selectedFactoryId;
    this.copyPerson.factoryName = factory.name;
  }

  onMadeFactoryDirectorClicked(): void {
    this.isMadeFactoryDirectorClicked = true;
  }

  async cancel() {

    if (!this.hasChanged) {
      this.closeDialog(PersonDialogResp.noNeedToSave());
      return;
    }

    const res = await this.getConfirmation();

    if (!res) {
      return;
    }

    this.closeDialog(PersonDialogResp.noNeedToSave());
  }

  async save() {

    if (!this.hasChanged) {
      this.closeDialog(PersonDialogResp.noNeedToSave());
      return;
    }

    const res = await this.getConfirmation();

    if (!res) {
      return;
    }

    if (this.isPersonFactoryChanged) {
      // todo era проставлять дефолтный департамент
      this.copyPerson.departmentId = '0';
      this.copyPerson.departmentName = 'Default department';
      await this.personController.updatePerson(this.copyPerson).toPromise();
    }

    if (this.isMadeFactoryDirectorClicked) {
      await this.factoryController.makeUserDirector(this.copyPerson.id).toPromise();
    }

    this.closeDialog(PersonDialogResp.save(this.copyPerson));

  }

  private async getConfirmation(): Promise<boolean> {
    return await this.confirmationService.confirm();
  }

  private closeDialog(dialogRes: PersonDialogResp): void {
    this.dialogRef?.close(dialogRes);
  }

  get hasChanged(): boolean {
    return this.isMadeFactoryDirectorClicked || this.isPersonFactoryChanged;
  }

  get isPersonFactoryChanged(): boolean {
    return this.person.factoryId !== this.copyPerson.factoryId;
  }

}
