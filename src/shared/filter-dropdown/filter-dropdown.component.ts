import {Component, Input} from '@angular/core';
import {FilterDescription} from "@model/filter/FilterDescription";
import {FilterDropdownDescription} from "@model/filter/FilterDropdownDescription";

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent<T> {

  @Input() set description(desc: FilterDescription) {
    this.dropdownDescription = <FilterDropdownDescription<T>>desc;
  }

  dropdownDescription: FilterDropdownDescription<T> | undefined;

  onValueChange(selectedIds: string[]): void {
    this.dropdownDescription?.onValueChange(selectedIds);
  }

}
