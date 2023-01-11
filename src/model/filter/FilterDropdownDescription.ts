import {FilterDescription} from "@model/filter/FilterDescription";

export interface FilterDropdownDescription<T> extends FilterDescription {

  label: string;

  getId: (element: T) => string;

  getName: (element: T) => string;

  elements: T[];

  onValueChange: (selectedIds: string[]) => void;

}
