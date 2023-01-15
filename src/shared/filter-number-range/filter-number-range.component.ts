import {Component, Input} from '@angular/core';
import {FilterDescription} from "@model/filter/description/FilterDescription";
import {FilterNumberRangeDescription} from "@model/filter/description/FilterNumberRangeDescription";
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

  numberRangeDescription: FilterNumberRangeDescription | undefined;

  onValueChange(value: NumberRange): void {
    this.numberRangeDescription?.onValueChange(value);
  }

}
