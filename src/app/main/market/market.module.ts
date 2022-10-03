import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MarketComponent} from "./market.component";
import {MarketRoutingModule} from "./market-routing.module";
import {TableModule} from "@shared/table/table.module";

@NgModule({
  declarations: [MarketComponent],
    imports: [
        CommonModule,
        MarketRoutingModule,
        TableModule,
    ],
  bootstrap: [MarketComponent]
})
export class MarketModule {
}
