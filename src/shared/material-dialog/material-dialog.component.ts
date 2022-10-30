import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WarehouseMaterial} from "@model/api/material/WarehouseMaterial";
import {Router} from "@angular/router";
import {MarketFilterService} from "@service/filter/market-filter.service";
import {DiagramChartOptions} from "@model/chart/DiagramChartOptions";

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss'],
})
export class MaterialDialogComponent {

  material: WarehouseMaterial;

  public chartOptions: Partial<DiagramChartOptions>;

  constructor(
    private dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { material: WarehouseMaterial },
    private readonly router: Router,
    private readonly marketFilterService: MarketFilterService,
  ) {
    this.material = data.material;

    this.chartOptions = {
      series: [102, 44, 55],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ['All', 'Department 1', 'Department 2',],
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

  async goToMarket(): Promise<void> {
    this.marketFilterService.materialName = this.material.name;
    await this.router.navigate(['/main/market']);
  }

}
