import {FilterDescription} from "@model/filter/description/FilterDescription";

export interface FilterInputDescription extends FilterDescription {

  placeholder: string;

  defaultValue: string;

  onValueChange: (value: string) => void;

}
