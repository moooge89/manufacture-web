import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReportComponent} from "./report.component";
import {ReportRoutingModule} from "./report-routing.module";
import {DropdownModule} from "@shared/dropdown/dropdown.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    DropdownModule,
    MatExpansionModule,
    NgApexchartsModule,
  ],
  bootstrap: [ReportComponent]
})
export class ReportModule {
}
