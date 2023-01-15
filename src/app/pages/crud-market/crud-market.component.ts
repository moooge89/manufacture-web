import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/api/material/MarketMaterial";
import {MarketController} from "@controller/MarketController";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {
  CrudMarketMaterialDialogComponent
} from "../../dialogue/crud-market-material/crud-market-material-dialog.component";
import {MarketMaterialResp} from "@model/dialog/MarketMaterialResp";
import {CrudMarketService} from "@service/crud-market/crud-market.service";
import {Subject} from "rxjs";
import {MaterialFilterReactor} from "@model/filter/reactor/MaterialFilterReactor";
import {FilterElement} from "@model/filter/FilterElement";
import {FilterInputDescription} from "@model/filter/FilterInputDescription";
import {FilterFieldType} from "@model/filter/FilterFieldType";
import {FilterDescription} from "@model/filter/FilterDescription";
import {Unsub} from "@util/Unsub";
import {FilterController} from "@controller/FilterController";
import {debounceTime, filter} from "rxjs/operators";
import {FilterDropdownDescription} from "@model/filter/FilterDropdownDescription";
import {FilterNumberRangeDescription} from "@model/filter/FilterNumberRangeDescription";

@Component({
  selector: 'app-crud-market',
  templateUrl: './crud-market.component.html',
  styleUrls: ['./crud-market.component.scss']
})
export class CrudMarketComponent implements OnInit, OnDestroy {

  materials$ = this.marketController.loadMarketMaterials(new MaterialFilter());

  panelOpenState = false;

  // todo era use Subject instead of EventEmitter on all places
  materialUpsert = new EventEmitter<MarketMaterial>();

  descriptions: FilterDescription[] = [];

  private readonly filterChangedSubject = new Subject<MaterialFilter>();
  private readonly filterReactor = new MaterialFilterReactor(this.filterChangedSubject);

  private dialogRef: MatDialogRef<CrudMarketMaterialDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly marketController: MarketController,
              private readonly filterController: FilterController,
              private readonly crudMarketService: CrudMarketService,) {
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

  getId = getIdFromFe;

  getName = getNameFromFe;

  isMatIcon = (index: number) => index === 0;

  isMoney = (index: number) => index === 3;

  deleteMaterials$ = (ids: Set<string>) => this.marketController.deleteMarketMaterials(ids);

  async onRowAddClick(): Promise<void> {
    const resp: MarketMaterialResp = await this.crudMarketService.openDialogForCreate();

    if (!resp.needToSave) {
      return;
    }

    this.materialUpsert.next(resp.material);
  }

  async onRowClick(material: MarketMaterial): Promise<void> {

    const resp: MarketMaterialResp = await this.crudMarketService.openDialogForEdit(material);

    if (!resp.needToSave) {
      return;
    }

    this.materialUpsert.next(resp.material);
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
      getId: this.getId,
      getName: this.getName,
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
