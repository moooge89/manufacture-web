import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MarketComponent} from "./market.component";
import {MarketRoutingModule} from "./market-routing.module";
import {TableModule} from "@shared/table/table.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {DynamicFilterModule} from "@shared/dynamic-filter/dynamic-filter.module";

@NgModule({
  declarations: [MarketComponent],
  imports: [
    CommonModule,
    MarketRoutingModule,
    TableModule,
    MatExpansionModule,
    MatIconModule,
    DynamicFilterModule,
  ],
  bootstrap: [MarketComponent]
})
export class MarketModule {
}
