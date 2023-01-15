import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonFactoryTransferDialogComponent} from "./person-factory-transfer-dialog.component";
import {ButtonModule} from "@shared/button/button.module";
import {DropdownModule} from "@shared/dropdown/dropdown.module";

@NgModule({
  declarations: [PersonFactoryTransferDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
  ],
  exports: [
    PersonFactoryTransferDialogComponent,
  ]
})
export class PersonFactoryTransferDialogModule {
}
