import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DiagramChartOptions} from "@model/chart/DiagramChartOptions";
import {Manufacture} from "@model/manufacture/Manufacture";
import {Unsub} from "@util/Unsub";
import {ManufactureController} from "@controller/ManufactureController";
import {ElementGroup} from "@model/manufacture/ElementGroup";

@Component({
  selector: 'app-manufacture-dialog',
  templateUrl: './manufacture-dialog.component.html',
  styleUrls: ['./manufacture-dialog.component.scss'],
})
export class ManufactureDialogComponent implements OnInit, OnDestroy {

  manufacture: Manufacture;

  chartOptions: Partial<DiagramChartOptions> | undefined;

  manufactureElements: ElementGroup[] = [];

  private readonly unsub = new Unsub();

  constructor(
    private dialogRef: MatDialogRef<ManufactureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { manufacture: Manufacture },
    private readonly manufactureController: ManufactureController,
  ) {
    this.manufacture = data.manufacture;
  }

  ngOnInit() {
    this.unsub.sub = this.manufactureController.loadManufactureElements(this.manufacture.manufactureType).subscribe(
      elements => this.initChart(elements)
    );
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  private initChart(manufactureElements: ElementGroup[]): void {

    this.manufactureElements = manufactureElements;

    const labels: string[] = manufactureElements.map(el => el.label);
    const series: number[] = manufactureElements.map(el => el.count);

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
