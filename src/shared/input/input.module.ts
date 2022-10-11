import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from "./input.component";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [InputComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
    ],
  exports: [
    InputComponent
  ]
})
export class InputModule {
}
