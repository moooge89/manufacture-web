import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/api/material/MarketMaterial";
import {MarketController} from "@controller/MarketController";
import {MaterialFilterMetaInfo} from "@model/filter/MaterialFilterMetaInfo";
import {defaultFilter} from "@util/FilterUtil";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {CrudMarketMaterialDialogComponent} from "../../dialogue/crud-market-material/crud-market-material-dialog.component";
import {FilterElement} from "@model/filter/FilterElement";
import {MarketMaterialResp} from "@model/dialog/MarketMaterialResp";
import {CrudMarketService} from "@service/crud-market/crud-market.service";

@Component({
  selector: 'app-create-market',
  templateUrl: './create-market.component.html',
  styleUrls: ['./create-market.component.scss']
})
export class CreateMarketComponent implements OnDestroy {

  materials$ = this.marketController.loadMarketMaterials(defaultFilter());

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

}
