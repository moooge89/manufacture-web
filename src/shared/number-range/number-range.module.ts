import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberRangeComponent} from "./number-range.component";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [NumberRangeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [
    NumberRangeComponent
  ]
})
export class NumberRangeModule {
}
