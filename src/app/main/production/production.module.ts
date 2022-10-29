import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductionComponent} from "./production.component";
import {ProductionRoutingModule} from "./production-routing.module";
import {TeamProductionModule} from "@shared/team-production/team-production.module";
import {DropdownModule} from "@shared/dropdown/dropdown.module";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [ProductionComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    TeamProductionModule,
    DropdownModule,
    MatIconModule,
  ],
  bootstrap: [ProductionComponent]
})
export class ProductionModule {
}
