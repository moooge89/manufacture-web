import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AnalyticsComponent} from "./analytics.component";
import {AnalyticsRoutingModule} from "./analytics-routing.module";
import {ButtonModule} from "@shared/button/button.module";
import {DropdownModule} from "@shared/dropdown/dropdown.module";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    ButtonModule,
    DropdownModule,
    NgApexchartsModule,
  ],
  bootstrap: [AnalyticsComponent]
})
export class AnalyticsModule {
}
