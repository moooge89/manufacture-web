import {TableFilter} from "@model/filter/TableFilter";
import {NumberRange} from "@model/filter/NumberRange";

export class ManufactureFilter extends TableFilter {

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
