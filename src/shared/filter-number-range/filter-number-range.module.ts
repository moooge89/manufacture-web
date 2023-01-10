import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterNumberRangeComponent} from "@shared/filter-number-range/filter-number-range.component";
import {NumberRangeModule} from "@shared/number-range/number-range.module";

@NgModule({
  declarations: [FilterNumberRangeComponent],
  imports: [
    CommonModule,
    NumberRangeModule,
  ],
  exports: [
    FilterNumberRangeComponent
  ]
})
export class FilterNumberRangeModule {
}
