import {Component, Input, OnDestroy} from '@angular/core';
import {FilterDescription} from "@model/filter/FilterDescription";
import {FilterDropdownDescription} from "@model/filter/FilterDropdownDescription";
import {Unsub} from "@util/Unsub";

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent<T> implements OnDestroy {

  @Input() set description(desc: FilterDescription) {
    const dropdownDesc = <FilterDropdownDescription<T>>desc;

    this.unsub.sub = dropdownDesc.elements$.subscribe(elements => {
      this.dropdownDescription = dropdownDesc;
      this.elements = elements;
    });
  }

  elements: T[] = [];

  dropdownDescription: FilterDropdownDescription<T> | undefined;

  private readonly unsub = new Unsub();

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  onValueChange(selectedIds: string[]): void {
    this.dropdownDescription?.onValueChange(selectedIds);
  }

}
