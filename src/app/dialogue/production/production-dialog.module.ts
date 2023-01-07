import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductionDialogComponent} from "./production-dialog.component";

@NgModule({
  declarations: [ProductionDialogComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ProductionDialogComponent
  ]
})
export class ProductionDialogModule {
}
