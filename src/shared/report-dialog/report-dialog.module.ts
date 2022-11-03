import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportDialogComponent} from "./report-dialog.component";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [ReportDialogComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  exports: [
    ReportDialogComponent
  ]
})
export class ReportDialogModule {
}
