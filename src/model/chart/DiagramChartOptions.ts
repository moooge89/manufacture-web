import {ApexChart, ApexNonAxisChartSeries, ApexResponsive} from "ng-apexcharts";

export class DiagramChartOptions {
  series: ApexNonAxisChartSeries | undefined;
  chart: ApexChart | undefined;
  responsive: ApexResponsive[] | undefined;
  labels: any;

  constructor(init?: Partial<DiagramChartOptions>) {
    Object.assign(this, init);
  }

}
