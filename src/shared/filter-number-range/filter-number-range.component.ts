import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {FilterDescription} from "@model/filter/FilterDescription";
import {FilterNumberRangeDescription} from "@model/filter/FilterNumberRangeDescription";
import {NumberRange} from "@model/filter/NumberRange";

@Component({
  selector: 'app-filter-number-range',
  templateUrl: './filter-number-range.component.html',
  styleUrls: ['./filter-number-range.component.scss'],
})
export class FilterNumberRangeComponent {

  @Input() set description(desc: FilterDescription) {
    this.numberRangeDescription = <FilterNumberRangeDescription>desc;
  }

  @Output() filterChanged = new EventEmitter<MaterialFilter>();

  numberRangeDescription: FilterNumberRangeDescription | undefined;

  onValueChange(value: NumberRange): void {
    this.numberRangeDescription?.onValueChange(value);
  }

}
