import {Filter} from "@model/filter/Filter";
import {NumberRange} from "@model/filter/NumberRange";

export class ManufactureFilter implements Filter {

  types: string[] = [];

  count: NumberRange = {
    min: undefined,
    max: undefined,
  };

  hrInvolved: NumberRange = {
    min: undefined,
    max: undefined,
  };

}
