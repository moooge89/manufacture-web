import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TableModule} from "@shared/table/table.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {CrudPersonComponent} from "./crud-person.component";
import {CrudPersonRoutingModule} from "./crud-person-routing.module";
import {DynamicFilterModule} from "@shared/dynamic-filter/dynamic-filter.module";

@NgModule({
  declarations: [CrudPersonComponent],
  imports: [
    CommonModule,
    CrudPersonRoutingModule,
    TableModule,
    MatExpansionModule,
    MatIconModule,
    DynamicFilterModule,
  ],
  bootstrap: [CrudPersonComponent]
})
export class CrudPersonModule {
}
