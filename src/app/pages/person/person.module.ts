import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PersonComponent} from "./person.component";
import {PersonRoutingModule} from "./person-routing.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {TableModule} from "@shared/table/table.module";
import {DynamicFilterModule} from "@shared/dynamic-filter/dynamic-filter.module";

@NgModule({
  declarations: [PersonComponent],
    imports: [
        CommonModule,
        PersonRoutingModule,
        MatExpansionModule,
        MatIconModule,
        TableModule,
        DynamicFilterModule,
    ],
  bootstrap: [PersonComponent]
})
export class PersonModule {
}
