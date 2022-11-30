import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "@shared/button/button.module";
import {ConfirmationComponent} from "./confirmation.component";

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  exports: [
    ConfirmationComponent,
  ]
})
export class ConfirmationModule {
}
