import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/material/MarketMaterial";
import {MarketController} from "@controller/MarketController";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {FilterDescription} from "@model/filter/description/FilterDescription";
import {Subject} from "rxjs";
import {MaterialFilterReactor} from "@model/filter/reactor/MaterialFilterReactor";
import {Unsub} from "@util/Unsub";
import {FilterInputDescription} from "@model/filter/description/FilterInputDescription";
import {FilterNumberRangeDescription} from "@model/filter/description/FilterNumberRangeDescription";
import {FilterDropdownDescription} from "@model/filter/description/FilterDropdownDescription";
import {FilterElement} from "@model/filter/FilterElement";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {debounceTime, filter} from "rxjs/operators";
import {PathContextService} from "@service/path-context/path-context.service";
import {Observable} from "rxjs/internal/Observable";
import {MarketDialogComponent} from "../../dialogue/market/market-dialog.component";
import {Sorting} from "@model/web/Sorting";
import {EnumController} from "@controller/EnumController";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit, OnDestroy {

  materials$: Observable<MarketMaterial[]>;

  panelOpenState = false;

  descriptions: FilterDescription[] = [];

  private readonly selectedMaterialName: string = '';

  private readonly filterChangedSubject = new Subject<MaterialFilter>();
  private readonly filterReactor = new MaterialFilterReactor(this.filterChangedSubject);

  private dialogRef: MatDialogRef<MarketDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly marketController: MarketController,
              private readonly filterController: EnumController,
              private readonly pathContextService: PathContextService,) {
    const materialName = this.pathContextService.materialName || '';
    const materialFilter = new MaterialFilter();
    materialFilter.materialName = materialName;

    this.selectedMaterialName = materialName;

    this.materials$ = this.marketController.loadMarketMaterials(materialFilter);
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

  isMatIcon = (index: number) => index === 0;

  isMoney = (index: number) => index === 3;

  onRowClick(material: MarketMaterial): void {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(MarketDialogComponent, {
      width: '720px',
      height: '350px',
      data: {material: material},
    });
  }

  onSortClicked(sorting: Sorting): void {
    this.filterReactor.onSortChange(sorting);
  }

  private initDescriptions(): void {
    const nameDesc = new FilterInputDescription({
      placeholder: 'Name...',
      defaultValue: this.selectedMaterialName,
      onValueChange: this.filterReactor.onNameChange,
    });

    const countryDesc = new FilterDropdownDescription<FilterElement>({
      elements$: this.filterController.loadCountryFilterElements(),
      getId: getIdFromFe,
      getName: getNameFromFe,
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
