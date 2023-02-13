import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/material/MarketMaterial";
import {FilterController} from "@controller/FilterController";
import {Unsub} from "@util/Unsub";
import {ConfirmationService} from "@service/confirmation/confirmation.service";
import {InputError} from "@model/web/InputError";
import {MarketMaterialResp} from "@model/dialog/MarketMaterialResp";
import {MarketController} from "@controller/MarketController";
import {FilterElement} from "@model/filter/FilterElement";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";

@Component({
  selector: 'app-crud-market-material-dialog',
  templateUrl: './crud-market-material-dialog.component.html',
  styleUrls: ['./crud-market-material-dialog.component.scss'],
})
export class CrudMarketMaterialDialogComponent implements OnInit, OnDestroy {

  material: MarketMaterial;
  copyMaterial: MarketMaterial;

  icons: FilterElement[] = [];
  countries: FilterElement[] = [];

  iconError: InputError = new InputError();
  nameError: InputError = new InputError();
  countryError: InputError = new InputError();
  priceError: InputError = new InputError();

  private readonly needToConfirm: boolean;
  private readonly isSave: boolean;

  private readonly unsub = new Unsub();

  constructor(
    private dialogRef: MatDialogRef<CrudMarketMaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { material: MarketMaterial, noNeedToConfirm: boolean, isSave: boolean },
    private readonly filterController: FilterController,
    private readonly marketController: MarketController,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.material = data.material;
    this.copyMaterial = new MarketMaterial({...data.material});

    this.needToConfirm = !data.noNeedToConfirm;
    this.isSave = data.isSave;
  }

  ngOnInit() {

    this.unsub.sub = this.filterController.loadCountryFilterElements().subscribe(countries => this.countries = countries);

    this.unsub.sub = this.filterController.loadIconFilterElements().subscribe(icons => this.icons = icons);

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

  onIconChange(icon: any): void {
    this.copyMaterial.icon = icon;
    this.iconError.clearIfHasError();
  }

  onNameChange(name: string): void {
    this.copyMaterial.name = name;
    this.nameError.clearIfHasError();
  }

  onCountryChange(country: any): void {
    this.copyMaterial.country = country;
    this.countryError.clearIfHasError();
  }

  onPriceChange(price: string): void {
    this.copyMaterial.price = Number.parseInt(price);
    this.priceError.clearIfHasError();
  }

  async cancel() {

    if (!this.hasChanged) {
      this.closeDialog(MarketMaterialResp.noNeedToSave());
      return;
    }

    const res = await this.getConfirmation();

    if (!res) {
      return;
    }

    this.closeDialog(MarketMaterialResp.noNeedToSave());
  }

  async save() {

    if (!this.validate()) {
      return;
    }

    if (!this.hasChanged) {
      this.closeDialog(MarketMaterialResp.noNeedToSave());
      return;
    }

    const res = await this.getConfirmation();

    if (!res) {
      return;
    }

    if (this.isSave) {
      this.copyMaterial.id = await this.marketController.createMarketMaterial(this.copyMaterial).toPromise();
    } else {
      await this.marketController.updateMarketMaterial(this.copyMaterial).toPromise();
    }

    this.closeDialog(MarketMaterialResp.save(this.copyMaterial));
  }

  private async getConfirmation() {
    if (this.needToConfirm) {
      return await this.confirmationService.confirm();
    }

    return true;
  }

  private validate(): boolean {

    let isValid = true;

    if (!this.copyMaterial.icon) {
      this.iconError.error('Choose icon');
      isValid = false;
    }

    if (!this.copyMaterial.name) {
      this.nameError.error('Name is blank');
      isValid = false;
    }

    if (!this.copyMaterial.country) {
      this.countryError.error('Choose country');
      isValid = false;
    }

    if (!this.copyMaterial.price) {
      this.priceError.error('Price is blank');
      isValid = false;
    }

    if (this.copyMaterial.price < 1) {
      this.priceError.error('Price is invalid');
      isValid = false;
    }

    return isValid;
  }

  private closeDialog(dialogRes: MarketMaterialResp): void {
    this.dialogRef?.close(dialogRes);
  }

  get hasChanged(): boolean {
    return this.material.icon !== this.copyMaterial.icon
      || this.material.country !== this.copyMaterial.country
      || this.material.name !== this.copyMaterial.name
      || this.material.price !== this.copyMaterial.price;
  }

}
