import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductionProcessComponent} from "./production-process.component";

@NgModule({
  declarations: [ProductionProcessComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ProductionProcessComponent
  ]
})
export class ProductionProcessModule {
}
