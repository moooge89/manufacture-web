import {FilterDescription} from "@model/filter/description/FilterDescription";
import {Observable} from "rxjs/internal/Observable";

export interface FilterDropdownDescription<T> extends FilterDescription {

  label: string;

  getId: (element: T) => string;

  getName: (element: T) => string;

  defaultSelectedDisplayValue: string;

  elements$: Observable<T[]>;

  onValueChange: (selectedIds: string[]) => void;

}
