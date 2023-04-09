import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/material/MarketMaterial";
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
import {FilterInputDescription} from "@model/filter/description/FilterInputDescription";
import {FilterDescription} from "@model/filter/description/FilterDescription";
import {Unsub} from "@util/Unsub";
import {debounceTime, filter} from "rxjs/operators";
import {FilterDropdownDescription} from "@model/filter/description/FilterDropdownDescription";
import {FilterNumberRangeDescription} from "@model/filter/description/FilterNumberRangeDescription";
import {Sorting} from "@model/web/Sorting";
import {EnumController} from "@controller/EnumController";

@Component({
  selector: 'app-crud-market',
  templateUrl: './crud-market.component.html',
  styleUrls: ['./crud-market.component.scss']
})
export class CrudMarketComponent implements OnInit, OnDestroy {

  materials$ = this.marketController.loadMarketMaterials(new MaterialFilter());

  panelOpenState = false;

  materialUpsert = new Subject<MarketMaterial>();

  descriptions: FilterDescription[] = [];

  private readonly filterChangedSubject = new Subject<MaterialFilter>();
  private readonly filterReactor = new MaterialFilterReactor(this.filterChangedSubject);

  private dialogRef: MatDialogRef<CrudMarketMaterialDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly filterController: EnumController,
              private readonly marketController: MarketController,
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

  deleteMaterials$ = (ids: Set<number>) => this.marketController.deleteMarketMaterials(ids);

  async onRowAddClick(): Promise<void> {
    const resp: MarketMaterialResp = await this.crudMarketService.openDialogForCreate();

    if (resp.doesNotNeedToSave()) {
      return;
    }

    this.materialUpsert.next(resp.material);
  }

  async onRowClick(material: MarketMaterial): Promise<void> {

    const resp: MarketMaterialResp = await this.crudMarketService.openDialogForEdit(material);

    if (resp.doesNotNeedToSave()) {
      return;
    }

    this.materialUpsert.next(resp.material);
  }

  onSortClicked(sorting: Sorting): void {
    this.filterReactor.onSortChange(sorting);
  }

  private initDescriptions(): void {
    const nameDesc = new FilterInputDescription({
      placeholder: 'Name...',
      defaultValue: '',
      onValueChange: this.filterReactor.onNameChange,
    });

    const countryDesc = new FilterDropdownDescription<FilterElement>({
      elements$: this.filterController.loadCountryFilterElements(),
      getId: this.getId,
      getName: this.getName,
      label: 'Country...',
      defaultSelectedDisplayValue: '',
      onValueChange: this.filterReactor.onCountriesChange,
    });

    const priceDesc = new FilterNumberRangeDescription({
      title: 'Price',
      onValueChange: this.filterReactor.onPriceChange,
    });

    this.descriptions.push(nameDesc, countryDesc, priceDesc);
  }

  get headers(): string[] {
    return ['Icon', 'Material name', 'Country', 'Price'];
  }

  get columnNames(): string[] {
    return ['icon', 'name', 'country', 'price'];
  }

}
