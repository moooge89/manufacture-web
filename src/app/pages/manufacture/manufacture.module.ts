import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {TableModule} from "@shared/table/table.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {DynamicFilterModule} from "@shared/dynamic-filter/dynamic-filter.module";
import {ManufactureRoutingModule} from "./manufacture-routing.module";
import {ManufactureComponent} from "./manufacture.component";

@NgModule({
  declarations: [ManufactureComponent],
  imports: [
    CommonModule,
    ManufactureRoutingModule,
    MatIconModule,
    TableModule,
    MatExpansionModule,
    DynamicFilterModule,
  ],
  bootstrap: [ManufactureComponent]
})
export class ManufactureModule {
}
