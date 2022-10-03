import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {WarehouseComponent} from "./warehouse.component";
import {WarehouseRoutingModule} from "./warehouse-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {TableModule} from "@shared/table/table.module";

@NgModule({
  declarations: [WarehouseComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    MatIconModule,
    TableModule,
  ],
  bootstrap: [WarehouseComponent]
})
export class WarehouseModule {
}
