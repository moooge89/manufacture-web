import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from "./filter.component";
import {DropdownModule} from "@shared/dropdown/dropdown.module";
import {InputModule} from "@shared/input/input.module";
import {FormsModule} from "@angular/forms";
import {NumberRangeModule} from "@shared/number-range/number-range.module";

@NgModule({
  declarations: [FilterComponent],
    imports: [
        CommonModule,
        DropdownModule,
        InputModule,
        FormsModule,
        NumberRangeModule,
    ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule {
}
