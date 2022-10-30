import {ApexChart, ApexNonAxisChartSeries, ApexResponsive} from "ng-apexcharts";

export interface DiagramChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
}
