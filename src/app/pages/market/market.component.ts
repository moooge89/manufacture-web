import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/api/material/MarketMaterial";
import {MarketController} from "@controller/MarketController";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {MarketMaterialDialogComponent} from "../../dialogue/market-material/market-material-dialog.component";
import {FilterDescription} from "@model/filter/FilterDescription";
import {Subject} from "rxjs";
import {MaterialFilterReactor} from "@model/filter/reactor/MaterialFilterReactor";
import {Unsub} from "@util/Unsub";
import {FilterInputDescription} from "@model/filter/FilterInputDescription";
import {FilterFieldType} from "@model/filter/FilterFieldType";
import {FilterNumberRangeDescription} from "@model/filter/FilterNumberRangeDescription";
import {FilterDropdownDescription} from "@model/filter/FilterDropdownDescription";
import {FilterElement} from "@model/filter/FilterElement";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {FilterController} from "@controller/FilterController";
import {debounceTime, filter} from "rxjs/operators";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit, OnDestroy {

  materials$ = this.marketController.loadMarketMaterials(new MaterialFilter());

  panelOpenState = false;

  descriptions: FilterDescription[] = [];

  private readonly filterChangedSubject = new Subject<MaterialFilter>();
  private readonly filterReactor = new MaterialFilterReactor(this.filterChangedSubject);

  private dialogRef: MatDialogRef<MarketMaterialDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly marketController: MarketController,
              private readonly filterController: FilterController,) {
  }

  ngOnInit() {

    this.initDescriptions();

    this.unsub.sub = this.filterChangedSubject.pipe(
      filter(x => !!x),
      debounceTime(300),
    ).subscribe(filter => this.materials$ = this.marketController.loadMarketMaterials(filter));

  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
  }

  isMatIcon = (index: number) => {
    return index === 0;
  }

  isMoney = (index: number) => {
    return index === 3;
  }

  onRowClick(material: MarketMaterial): void {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(MarketMaterialDialogComponent, {
      width: '720px',
      height: '320px',
      data: {material: material},
    });
  }

  private initDescriptions(): void {
    const nameDesc: FilterInputDescription = {
      fieldType: FilterFieldType.INPUT,
      placeholder: 'Name...',
      onValueChange: this.filterReactor.onNameChange,
    };

    const countryDesc: FilterDropdownDescription<FilterElement> = {
      elements$: this.filterController.loadCountryFilterElements(),
      fieldType: FilterFieldType.DROPDOWN,
      getId: getIdFromFe,
      getName: getNameFromFe,
      label: 'Country...',
      onValueChange: this.filterReactor.onCountriesChange,
    };

    const priceDesc: FilterNumberRangeDescription = {
      fieldType: FilterFieldType.NUMBER_RANGE,
      title: 'Price',
      onValueChange: this.filterReactor.onPriceChange,
    };

    this.descriptions.push(nameDesc, countryDesc, priceDesc);
  }

  get headers(): string[] {
    return ['Icon', 'Material name', 'Country', 'Price'];
  }

  get columnNames(): string[] {
    return ['icon', 'name', 'country', 'price'];
  }

}
