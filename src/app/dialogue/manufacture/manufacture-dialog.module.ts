import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgApexchartsModule} from "ng-apexcharts";
import {ManufactureDialogComponent} from "./manufacture-dialog.component";

@NgModule({
  declarations: [ManufactureDialogComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  exports: [
    ManufactureDialogComponent,
  ]
})
export class ManufactureDialogModule {
}
