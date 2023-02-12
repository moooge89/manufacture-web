import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from "ng-apexcharts";

export class ColumnChartOptions {
  series: ApexAxisChartSeries | undefined;
  chart: ApexChart | undefined;
  dataLabels: ApexDataLabels | undefined;
  plotOptions: ApexPlotOptions | undefined;
  yaxis: ApexYAxis | undefined;
  xaxis: ApexXAxis | undefined;
  fill: ApexFill | undefined;
  tooltip: ApexTooltip | undefined;
  stroke: ApexStroke | undefined;
  legend: ApexLegend | undefined;

  constructor(init?: Partial<ColumnChartOptions>) {
    Object.assign(this, init);
  }

}
