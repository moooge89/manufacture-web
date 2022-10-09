import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MarketComponent} from "./market.component";
import {MarketRoutingModule} from "./market-routing.module";
import {TableModule} from "@shared/table/table.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {FilterModule} from "@shared/filter/filter.module";

@NgModule({
  declarations: [MarketComponent],
  imports: [
    CommonModule,
    MarketRoutingModule,
    TableModule,
    MatExpansionModule,
    MatIconModule,
    FilterModule,
  ],
  bootstrap: [MarketComponent]
})
export class MarketModule {
}
