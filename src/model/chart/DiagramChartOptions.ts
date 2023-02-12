import {ApexChart, ApexNonAxisChartSeries, ApexResponsive} from "ng-apexcharts";

export class DiagramChartOptions {
  public series: ApexNonAxisChartSeries | undefined;
  public chart: ApexChart | undefined;
  public responsive: ApexResponsive[] | undefined;
  public labels: any;

  public constructor(init?: Partial<DiagramChartOptions>) {
    Object.assign(this, init);
  }

}
