import {FilterDescription} from "@model/filter/FilterDescription";
import {Observable} from "rxjs/internal/Observable";

export interface FilterDropdownDescription<T> extends FilterDescription {

  label: string;

  getId: (element: T) => string;

  getName: (element: T) => string;

  elements$: Observable<T[]>;

  onValueChange: (values: T[]) => void;

}
