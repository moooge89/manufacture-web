import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WarehouseMaterial} from "@model/material/WarehouseMaterial";
import {Router} from "@angular/router";
import {DiagramChartOptions} from "@model/chart/DiagramChartOptions";
import {PathContextService} from "@service/path-context/path-context.service";
import {WarehouseController} from "@controller/WarehouseController";
import {MarketController} from "@controller/MarketController";
import {Unsub} from "@util/Unsub";
import {ElementGroup} from "@model/manufacture/ElementGroup";
import {MaterialPriceInfo} from "@model/material/MaterialPriceInfo";

@Component({
  selector: 'app-warehouse-dialog',
  templateUrl: './warehouse-dialog.component.html',
  styleUrls: ['./warehouse-dialog.component.scss'],
})
export class WarehouseDialogComponent implements OnInit, OnDestroy {

  readonly material: WarehouseMaterial;

  priceInfo: MaterialPriceInfo | undefined;

  chartOptions: Partial<DiagramChartOptions> | undefined;

  private readonly unsub = new Unsub();

  constructor(
    private dialogRef: MatDialogRef<WarehouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { material: WarehouseMaterial },
    private readonly router: Router,
    private readonly pathContextService: PathContextService,
    private readonly marketController: MarketController,
    private readonly warehouseController: WarehouseController,
  ) {
    this.material = data.material;
  }

  ngOnInit() {
    this.unsub.sub = this.warehouseController.loadWarehouseStoredInfo(this.material.id).subscribe(warehouseInfo => this.initChart(warehouseInfo));

    this.unsub.sub = this.marketController.loadMaterialPriceInfo(this.material.id).subscribe(priceInfo => this.priceInfo = priceInfo);
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  async goToMarket(): Promise<void> {
    this.pathContextService.materialName = this.material.name;
    await this.router.navigate(['/main/market']);
  }

  private initChart(warehouseInfo: ElementGroup[]) {

    if (!warehouseInfo || warehouseInfo.length === 0) {
      warehouseInfo = [{label: 'No data', count: 1}];
    }

    const labels: string[] = warehouseInfo.map(el => el.label);
    const series: number[] = warehouseInfo.map(el => el.count);

    this.chartOptions = {
      series: series,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
