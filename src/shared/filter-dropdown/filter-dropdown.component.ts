import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {FilterDescription} from "@model/filter/FilterDescription";
import {FilterDropdownDescription} from "@model/filter/FilterDropdownDescription";
import {Unsub} from "@util/Unsub";

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent<T> implements OnInit, OnDestroy {

  @Input() set description(desc: FilterDescription) {
    this.dropdownDescription = <FilterDropdownDescription<T>>desc;
  }

  @Output() filterChanged = new EventEmitter<MaterialFilter>();

  elements: T[] = [];

  dropdownDescription: FilterDropdownDescription<T> | undefined;

  private readonly unsub = new Unsub();

  ngOnInit() {
    if (this.dropdownDescription) {
      this.unsub.sub = this.dropdownDescription.elements$.subscribe(elements => this.elements = elements);
    }
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  onValueChange(selectedIds: string[]): void {
    const selectedElements = this.elements.filter(element => selectedIds.indexOf(this.definedDescription.getId(element)) > -1);

    this.dropdownDescription?.onValueChange(selectedElements);
  }

  get definedDescription(): FilterDropdownDescription<T> {
    if (!this.dropdownDescription) {
      throw new Error('J75wY003r1 :: Expected to be defined');
    }

    return this.dropdownDescription;
  }

}
