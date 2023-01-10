import {FilterDescription} from "@model/filter/FilterDescription";

export interface FilterInputDescription extends FilterDescription {

  placeholder: string;

  onValueChange: (value: string) => void;

}
