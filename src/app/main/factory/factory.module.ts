import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FactoryComponent} from "./factory.component";
import {FactoryRoutingModule} from "./factory-routing.module";

@NgModule({
  declarations: [FactoryComponent],
  imports: [
    CommonModule,
    FactoryRoutingModule,
  ],
  bootstrap: [FactoryComponent]
})
export class FactoryModule {
}
