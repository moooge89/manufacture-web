import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductionComponent} from "./production.component";
import {ProductionRoutingModule} from "./production-routing.module";
import {TeamProductionModule} from "@shared/team-production/team-production.module";

@NgModule({
  declarations: [ProductionComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    TeamProductionModule,
  ],
  bootstrap: [ProductionComponent]
})
export class ProductionModule {
}
