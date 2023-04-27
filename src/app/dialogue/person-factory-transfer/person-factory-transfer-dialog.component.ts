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

  readonly person: Person;
  copyPerson: Person;

  factories: FilterElement[] = [];

  private readonly unsub = new Unsub();

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
    this.unsub.sub = this.factoryController.loadFactoriesAsFilterElements().subscribe(factories => this.factories = factories);
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

  onFactoryChange(elementIds: number[]): void {
    if (elementIds?.length === 0) return;

    const selectedFactoryId = elementIds[0];
    const index = this.factories.findIndex(x => x.id === selectedFactoryId);

    if (index < 0) {
      throw new Error(`Cannot find factory with ID ${selectedFactoryId}`);
    }

    const factory = this.factories[index];

    this.copyPerson.factoryId = selectedFactoryId;
    this.copyPerson.factoryName = factory.displayValue;
  }

  async cancel() {

    if (!this.hasChanged()) {
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

    if (!this.hasChanged()) {
      this.closeDialog(PersonDialogResp.noNeedToSave());
      return;
    }

    const res = await this.getConfirmation();

    if (!res) {
      return;
    }

    this.copyPerson = await this.personController.updatePerson(this.copyPerson).toPromise();

    this.closeDialog(PersonDialogResp.save(this.copyPerson));
  }

  private async getConfirmation(): Promise<boolean> {
    return await this.confirmationService.confirm();
  }

  private closeDialog(dialogRes: PersonDialogResp): void {
    this.dialogRef?.close(dialogRes);
  }

  private hasChanged(): boolean {
    return this.person.factoryId !== this.copyPerson.factoryId;
  }

}
