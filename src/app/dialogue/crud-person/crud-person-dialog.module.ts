import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "@shared/button/button.module";
import {InputModule} from "@shared/input/input.module";
import {DropdownModule} from "@shared/dropdown/dropdown.module";
import {CrudPersonDialogComponent} from "./crud-person-dialog.component";

@NgModule({
  declarations: [CrudPersonDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputModule,
    DropdownModule,
  ],
  exports: [
    CrudPersonDialogComponent,
  ]
})
export class CrudPersonDialogModule {
}
