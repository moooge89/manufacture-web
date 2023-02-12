import {FilterDescription} from "@model/filter/description/FilterDescription";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";

export class FilterDropdownDescription<T> implements FilterDescription {

  label: string = '';

  getId: (element: T) => string = () => '';

  getName: (element: T) => string = () => '';

  defaultSelectedDisplayValue: string = '';

  elements$: Observable<T[]> = of([]);

  onValueChange: (selectedIds: string[]) => void = () => undefined;

  constructor(init?: Partial<FilterDropdownDescription<T>>) {
    Object.assign(this, init);
  }

}
