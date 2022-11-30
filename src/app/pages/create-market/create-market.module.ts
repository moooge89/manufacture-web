import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TableModule} from "@shared/table/table.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {FilterModule} from "@shared/filter/filter.module";
import {CreateMarketComponent} from "./create-market.component";
import {CreateMarketRoutingModule} from "./create-market-routing.module";
import {CrudMarketMaterialDialogModule} from "../../dialogue/crud-market-material/crud-market-material-dialog.module";

@NgModule({
  declarations: [CreateMarketComponent],
  imports: [
    CommonModule,
    CreateMarketRoutingModule,
    TableModule,
    MatExpansionModule,
    MatIconModule,
    FilterModule,
    CrudMarketMaterialDialogModule,
  ],
  bootstrap: [CreateMarketComponent]
})
export class CreateMarketModule {
}
