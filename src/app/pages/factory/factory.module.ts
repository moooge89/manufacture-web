import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FactoryComponent} from "./factory.component";
import {FactoryRoutingModule} from "./factory-routing.module";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [FactoryComponent],
    imports: [
        CommonModule,
        FactoryRoutingModule,
        MatIconModule,
    ],
  bootstrap: [FactoryComponent]
})
export class FactoryModule {
}
