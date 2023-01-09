import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/api/material/MarketMaterial";
import {MarketController} from "@controller/MarketController";
import {MaterialFilterMetaInfo} from "@model/filter/MaterialFilterMetaInfo";
import {emptyMaterialFilter} from "@util/FilterUtil";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {
  CrudMarketMaterialDialogComponent
} from "../../dialogue/crud-market-material/crud-market-material-dialog.component";
import {FilterElement} from "@model/filter/FilterElement";
import {MarketMaterialResp} from "@model/dialog/MarketMaterialResp";
import {CrudMarketService} from "@service/crud-market/crud-market.service";

@Component({
  selector: 'app-crud-market',
  templateUrl: './crud-market.component.html',
  styleUrls: ['./crud-market.component.scss']
})
export class CrudMarketComponent implements OnDestroy {

  materials$ = this.marketController.loadMarketMaterials(emptyMaterialFilter());

  panelOpenState = false;

  filterMetaInfo: MaterialFilterMetaInfo = {
    useAvailable: false,
    useCountries: true,
    useDepartments: false,
    useMaterialName: true,
    usePrice: true,
  };

  materialUpsert = new EventEmitter<MarketMaterial>();

  private dialogRef: MatDialogRef<CrudMarketMaterialDialogComponent> | undefined;

  constructor(private readonly marketController: MarketController,
              private readonly crudMarketService: CrudMarketService,) {
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  getId = (element: FilterElement) => element.id;

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

  onFilterChange(filter: MaterialFilter): void {
    this.materials$ = this.marketController.loadMarketMaterials(filter);
  }

  get headers(): string[] {
    return ['Icon', 'Material name', 'Country', 'Price'];
  }

  get columnNames(): string[] {
    return ['icon', 'name', 'country', 'price'];
  }

}
