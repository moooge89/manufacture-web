import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {WarehouseComponent} from "./warehouse.component";
import {WarehouseRoutingModule} from "./warehouse-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {TableModule} from "@shared/table/table.module";
import {FilterModule} from "@shared/filter/filter.module";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [WarehouseComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    MatIconModule,
    TableModule,
    FilterModule,
    MatExpansionModule,
  ],
  bootstrap: [WarehouseComponent]
})
export class WarehouseModule {
}
