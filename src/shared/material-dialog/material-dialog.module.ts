import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialDialogComponent} from "./material-dialog.component";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [MaterialDialogComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  exports: [
    MaterialDialogComponent,
  ]
})
export class MaterialDialogModule {
}
