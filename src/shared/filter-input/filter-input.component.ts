import {Component, Input} from '@angular/core';
import {FilterInputDescription} from "@model/filter/description/FilterInputDescription";
import {FilterDescription} from "@model/filter/description/FilterDescription";

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
export class FilterInputComponent {

  @Input() set description(desc: FilterDescription) {
    this.inputDescription = <FilterInputDescription>desc;
  }

  inputDescription: FilterInputDescription | undefined;

  onValueChange(value: string): void {
    this.inputDescription?.onValueChange(value);
  }

}
