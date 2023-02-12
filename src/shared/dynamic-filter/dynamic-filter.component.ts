import {Component, Input} from '@angular/core';
import {FilterDescription} from "@model/filter/description/FilterDescription";
import {FilterInputDescription} from "@model/filter/description/FilterInputDescription";
import {FilterDropdownDescription} from "@model/filter/description/FilterDropdownDescription";
import {FilterNumberRangeDescription} from "@model/filter/description/FilterNumberRangeDescription";

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
})
export class DynamicFilterComponent {

  @Input() descriptions: FilterDescription[] = [];

  isInput(description: FilterDescription): boolean {
    return description instanceof FilterInputDescription;
  }

  isDropdown(description: FilterDescription): boolean {
    return description instanceof FilterDropdownDescription;
  }

  isNumberRange(description: FilterDescription): boolean {
    return description instanceof FilterNumberRangeDescription;
  }

}
