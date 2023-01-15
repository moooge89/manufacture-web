import {Component, Input, OnDestroy} from '@angular/core';
import {FilterDescription} from "@model/filter/description/FilterDescription";
import {FilterDropdownDescription} from "@model/filter/description/FilterDropdownDescription";
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
      this.findAndSetDefaultIdByDisplayValue(dropdownDesc.defaultSelectedDisplayValue);
    });
  }

  selectedElementId: string | undefined;

  elements: T[] = [];

  dropdownDescription: FilterDropdownDescription<T> | undefined;

  private readonly unsub = new Unsub();

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  onValueChange(selectedIds: string[]): void {
    this.dropdownDescription?.onValueChange(selectedIds);
  }

  private findAndSetDefaultIdByDisplayValue(displayValue: string): void {
    if (!this.dropdownDescription || !displayValue) {
      return;
    }

    const index = this.elements.findIndex(element => this.dropdownDescription?.getName(element) === displayValue);

    if (index < 0) {
      return;
    }

    this.selectedElementId = this.dropdownDescription.getId(this.elements[index]);

  }

}
