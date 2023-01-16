import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {WarehouseMaterial} from "@model/api/material/WarehouseMaterial";
import {Router} from "@angular/router";
import {DiagramChartOptions} from "@model/chart/DiagramChartOptions";
import {PathContextService} from "@service/path-context/path-context.service";

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss'],
})
// todo era rename to WarehouseMaterialDialogComponent
export class MaterialDialogComponent {

  material: WarehouseMaterial;

  public chartOptions: Partial<DiagramChartOptions>;

  constructor(
    private dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { material: WarehouseMaterial },
    private readonly router: Router,
    private readonly pathContextService: PathContextService,
  ) {
    this.material = data.material;

    // todo era get info from controller to make it easier in future to swap to server
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
    this.pathContextService.materialName = this.material.name;
    await this.router.navigate(['/main/market']);
  }

}
