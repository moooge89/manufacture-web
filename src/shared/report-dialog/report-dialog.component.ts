import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ColumnChartOptions} from "@model/chart/ColumnChartOptions";
import {ReportDescription} from "@model/report/ReportDescription";

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss'],
})
export class ReportDialogComponent {

  chartOptions: Partial<ColumnChartOptions>;

  constructor(
    private dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { reportDescription: ReportDescription },
  ) {

    const description = data.reportDescription;

    this.chartOptions = {
      series: [
        {
          name: 'Manufactured parts (first)',
          data: description.firstCountScale,
        },
        {
          name: 'Manufactured parts (second)',
          data: description.secondCountScale,
        },
        {
          name: 'Manufacture coefficient (first)',
          data: description.firstCoefScale,
        },
        {
          name: 'Manufacture coefficient (second)',
          data: description.secondCoefScale,
        }
      ],
      chart: {
        type: "bar",
        height: 450
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
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
