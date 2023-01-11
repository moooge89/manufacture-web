import {Component, Input} from '@angular/core';
import {FilterDescription} from "@model/filter/FilterDescription";
import {FilterFieldType} from "@model/filter/FilterFieldType";

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
})
export class DynamicFilterComponent {

  @Input() descriptions: FilterDescription[] = [];

  isInput(description: FilterDescription): boolean {
    return description.fieldType === FilterFieldType.INPUT;
  }

  isDropdown(description: FilterDescription): boolean {
    return description.fieldType === FilterFieldType.DROPDOWN;
  }

  isNumberRange(description: FilterDescription): boolean {
    return description.fieldType === FilterFieldType.NUMBER_RANGE;
  }

}
