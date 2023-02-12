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
  public series: ApexAxisChartSeries | undefined;
  public chart: ApexChart | undefined;
  public dataLabels: ApexDataLabels | undefined;
  public plotOptions: ApexPlotOptions | undefined;
  public yaxis: ApexYAxis | undefined;
  public xaxis: ApexXAxis | undefined;
  public fill: ApexFill | undefined;
  public tooltip: ApexTooltip | undefined;
  public stroke: ApexStroke | undefined;
  public legend: ApexLegend | undefined;

  public constructor(init?: Partial<ColumnChartOptions>) {
    Object.assign(this, init);
  }

}
