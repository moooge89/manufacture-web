import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ColumnChartOptions} from "@model/chart/ColumnChartOptions";
import {AnalyticsDescription} from "@model/analytics/AnalyticsDescription";

@Component({
  selector: 'app-analytics-dialog',
  templateUrl: './analytics-dialog.component.html',
  styleUrls: ['./analytics-dialog.component.scss'],
})
export class AnalyticsDialogComponent {

  readonly chartOptions: Partial<ColumnChartOptions>;

  constructor(
    private dialogRef: MatDialogRef<AnalyticsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {
      description: AnalyticsDescription,
      showCoef: boolean
    },
  ) {

    const description = data.description;

    this.chartOptions = {
      series: [
        {
          name: description.countLabel,
          data: description.countScale,
        },
      ],
      chart: {
        type: "line",
        height: 450,
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: description.categories,
      },
      yaxis: {
        title: {
          text: "manufactured"
        }
      },
      fill: {
        opacity: 1
      },
    };

  }

}
