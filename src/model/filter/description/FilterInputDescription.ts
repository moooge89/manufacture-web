import {FilterDescription} from "@model/filter/description/FilterDescription";

export class FilterInputDescription implements FilterDescription {

  placeholder: string = '';

  defaultValue: string = '';

  onValueChange: (value: string) => void = () => undefined;

  constructor(init?: Partial<FilterInputDescription>) {
    Object.assign(this, init);
  }

}
