import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Material} from "@model/api/Material";
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss'],
})
export class MaterialDialogComponent {

  material: Material;

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;


  constructor(private dialogRef: MatDialogRef<MaterialDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: { material: Material }) {
    this.material = data.material;

    this.chartOptions = {
      series: [102, 44, 55],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ['All', 'Department 1', 'Department 2'],
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

  closeDialog(): void {
    this.dialogRef.close();
  }

}
