import {FilterDescription} from "@model/filter/description/FilterDescription";
import {NumberRange} from "@model/filter/NumberRange";

export interface FilterNumberRangeDescription extends FilterDescription {

  title: string;

  onValueChange: (value: NumberRange) => void;

}
