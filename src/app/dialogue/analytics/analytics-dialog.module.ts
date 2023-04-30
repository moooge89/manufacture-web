import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgApexchartsModule} from "ng-apexcharts";
import {AnalyticsDialogComponent} from "./analytics-dialog.component";

@NgModule({
  declarations: [AnalyticsDialogComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  exports: [
    AnalyticsDialogComponent
  ]
})
export class AnalyticsDialogModule {
}
