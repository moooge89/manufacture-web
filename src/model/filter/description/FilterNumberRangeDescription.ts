import {FilterDescription} from "@model/filter/description/FilterDescription";
import {NumberRange} from "@model/filter/NumberRange";

export class FilterNumberRangeDescription implements FilterDescription {

  title: string = '';

  onValueChange: (value: NumberRange) => void = () => undefined;

  public constructor(init?: Partial<FilterNumberRangeDescription>) {
    Object.assign(this, init);
  }

}
