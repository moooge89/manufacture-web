import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterDropdownComponent} from "@shared/filter-dropdown/filter-dropdown.component";
import {DropdownModule} from "@shared/dropdown/dropdown.module";

@NgModule({
  declarations: [FilterDropdownComponent],
  imports: [
    CommonModule,
    DropdownModule,
  ],
  exports: [
    FilterDropdownComponent
  ]
})
export class FilterDropdownModule {
}
