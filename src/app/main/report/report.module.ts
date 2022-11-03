import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReportComponent} from "./report.component";
import {ReportRoutingModule} from "./report-routing.module";
import {DropdownModule} from "@shared/dropdown/dropdown.module";
import {NgApexchartsModule} from "ng-apexcharts";
import {ButtonModule} from "@shared/button/button.module";

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    DropdownModule,
    NgApexchartsModule,
    ButtonModule,
  ],
  bootstrap: [ReportComponent]
})
export class ReportModule {
}
