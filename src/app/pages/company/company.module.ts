import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CompanyComponent} from "./company.component";
import {CompanyRoutingModule} from "./company-routing.module";
import {TableModule} from "@shared/table/table.module";

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    TableModule,
  ],
  bootstrap: [CompanyComponent]
})
export class CompanyModule {
}
