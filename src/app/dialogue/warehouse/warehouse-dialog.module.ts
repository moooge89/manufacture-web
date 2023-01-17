import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WarehouseDialogComponent} from "./warehouse-dialog.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {ButtonModule} from "@shared/button/button.module";

@NgModule({
  declarations: [WarehouseDialogComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    ButtonModule,
  ],
  exports: [
    WarehouseDialogComponent,
  ]
})
export class WarehouseDialogModule {
}
