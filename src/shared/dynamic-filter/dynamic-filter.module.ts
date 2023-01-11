import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFilterComponent} from "@shared/dynamic-filter/dynamic-filter.component";
import {FilterInputModule} from "@shared/filter-input/filter-input.module";
import {FilterDropdownModule} from "@shared/filter-dropdown/filter-dropdown.module";
import {FilterNumberRangeModule} from "@shared/filter-number-range/filter-number-range.module";

@NgModule({
  declarations: [DynamicFilterComponent],
  imports: [
    CommonModule,
    FilterInputModule,
    FilterDropdownModule,
    FilterNumberRangeModule,
  ],
  exports: [
    DynamicFilterComponent
  ]
})
export class DynamicFilterModule {
}
