import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudMarketMaterialDialogComponent} from "./crud-market-material-dialog.component";
import {ButtonModule} from "@shared/button/button.module";
import {InputModule} from "@shared/input/input.module";
import {DropdownModule} from "@shared/dropdown/dropdown.module";

@NgModule({
  declarations: [CrudMarketMaterialDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputModule,
    DropdownModule,
  ],
  exports: [
    CrudMarketMaterialDialogComponent,
  ]
})
export class CrudMarketMaterialDialogModule {
}
