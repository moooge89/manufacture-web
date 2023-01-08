import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TableModule} from "@shared/table/table.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {FilterModule} from "@shared/filter/filter.module";
import {CrudMarketMaterialDialogModule} from "../../dialogue/crud-market-material/crud-market-material-dialog.module";
import {CrudPersonComponent} from "./crud-person.component";
import {CrudPersonRoutingModule} from "./crud-person-routing.module";

@NgModule({
  declarations: [CrudPersonComponent],
  imports: [
    CommonModule,
    CrudPersonRoutingModule,
    TableModule,
    MatExpansionModule,
    MatIconModule,
    FilterModule,
    CrudMarketMaterialDialogModule,
  ],
  bootstrap: [CrudPersonComponent]
})
export class CrudPersonModule {
}
