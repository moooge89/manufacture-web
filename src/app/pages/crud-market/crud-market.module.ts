import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TableModule} from "@shared/table/table.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {FilterModule} from "@shared/filter/filter.module";
import {CrudMarketComponent} from "./crud-market.component";
import {CrudMarketRoutingModule} from "./crud-market-routing.module";
import {CrudMarketMaterialDialogModule} from "../../dialogue/crud-market-material/crud-market-material-dialog.module";

@NgModule({
  declarations: [CrudMarketComponent],
  imports: [
    CommonModule,
    CrudMarketRoutingModule,
    TableModule,
    MatExpansionModule,
    MatIconModule,
    FilterModule,
    CrudMarketMaterialDialogModule,
  ],
  bootstrap: [CrudMarketComponent]
})
export class CrudMarketModule {
}
