import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TableModule} from "@shared/table/table.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {CrudMarketComponent} from "./crud-market.component";
import {CrudMarketRoutingModule} from "./crud-market-routing.module";
import {DynamicFilterModule} from "@shared/dynamic-filter/dynamic-filter.module";

@NgModule({
  declarations: [CrudMarketComponent],
    imports: [
        CommonModule,
        CrudMarketRoutingModule,
        TableModule,
        MatExpansionModule,
        MatIconModule,
        DynamicFilterModule,
    ],
  bootstrap: [CrudMarketComponent]
})
export class CrudMarketModule {
}
