import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialDialogComponent} from "./material-dialog.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {ButtonModule} from "@shared/button/button.module";

@NgModule({
  declarations: [MaterialDialogComponent],
    imports: [
        CommonModule,
        NgApexchartsModule,
        ButtonModule,
    ],
  exports: [
    MaterialDialogComponent,
  ]
})
export class MaterialDialogModule {
}
