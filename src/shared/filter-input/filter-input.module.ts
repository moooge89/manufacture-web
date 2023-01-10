import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputModule} from "@shared/input/input.module";
import {FilterInputComponent} from "@shared/filter-input/filter-input.component";

@NgModule({
  declarations: [FilterInputComponent],
  imports: [
    CommonModule,
    InputModule,
  ],
  exports: [
    FilterInputComponent
  ]
})
export class FilterInputModule {
}
