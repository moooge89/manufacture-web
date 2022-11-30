import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/api/material/MarketMaterial";
import {FilterController} from "@controller/FilterController";
import {Unsub} from "@util/Unsub";
import {ConfirmationService} from "@service/confirmation/confirmation.service";
import {InputError} from "@model/web/InputError";
import {MarketMaterialResp} from "@model/dialog/MarketMaterialResp";

@Component({
  selector: 'app-crud-market-material-dialog',
  templateUrl: './crud-market-material-dialog.component.html',
  styleUrls: ['./crud-market-material-dialog.component.scss'],
})
export class CrudMarketMaterialDialogComponent implements OnInit, OnDestroy {

  material: MarketMaterial;
  copyMaterial: MarketMaterial;

  icons: string[] = [];
  countries: string[] = [];

  iconError: InputError = {hasError: false, errorText: ''};
  nameError: InputError = {hasError: false, errorText: ''};
  countryError: InputError = {hasError: false, errorText: ''};
  priceError: InputError = {hasError: false, errorText: ''};

  private readonly needToConfirm: boolean;
  private readonly isSave: boolean;

  private readonly unsub = new Unsub();

  constructor(
    private dialogRef: MatDialogRef<CrudMarketMaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { material: MarketMaterial, noNeedToConfirm: boolean, isSave: boolean },
    private readonly filterController: FilterController,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.material = data.material;
    this.copyMaterial = {...data.material};

    this.needToConfirm = !data.noNeedToConfirm;
    this.isSave = data.isSave;
  }

  ngOnInit() {

    this.unsub.sub = this.filterController.loadIcons().subscribe(icons => this.icons = icons);

    this.unsub.sub = this.filterController.loadCountries().subscribe(countries => this.countries = countries);
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  getId = (element: string) => element;

  getName = (element: string) => element;

  onIconChange(icon: any): void {
    this.copyMaterial.icon = icon;
    this.iconError.hasError = false;
  }

  onNameChange(name: string): void {
    this.copyMaterial.name = name;
    this.nameError.hasError = false;
  }

  onCountryChange(country: any): void {
    this.copyMaterial.country = country;
    this.countryError.hasError = false;
  }

  onPriceChange(price: string): void {
    this.copyMaterial.price = Number.parseInt(price);
    this.priceError.hasError = false;
  }

  async cancel() {

    if (!this.hasChanged) {
      this.closeDialog({needToSave: false, material: undefined});
      return;
    }

    const res = await this.getConfirmation();

    if (!res) {
      return;
    }

    this.closeDialog({needToSave: false, material: undefined});
  }

  async save() {

    if (!this.validate()) {
      return;
    }

    if (!this.hasChanged) {
      this.closeDialog({needToSave: false, material: undefined});
      return;
    }

    const res = await this.getConfirmation();

    if (!res) {
      return;
    }


    {
      // todo era make request to server here
      if (this.isSave) {
        this.copyMaterial.id = '2';
      }
    }

    this.closeDialog({needToSave: true, material: this.copyMaterial});
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
      this.iconError.hasError = true;
      this.iconError.errorText = 'Choose icon';
      isValid = false;
    }

    if (!this.copyMaterial.name) {
      this.nameError.hasError = true;
      this.nameError.errorText = 'Name is blank';
      isValid = false;
    }

    if (!this.copyMaterial.country) {
      this.countryError.hasError = true;
      this.countryError.errorText = 'Choose country';
      isValid = false;
    }

    if (!this.copyMaterial.price) {
      this.priceError.hasError = true;
      this.priceError.errorText = 'Price is blank';
      isValid = false;
    }

    if (this.copyMaterial.price < 1) {
      this.priceError.hasError = true;
      this.priceError.errorText = 'Price is invalid';
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
