import {TableFilter} from "@model/filter/TableFilter";
import {NumberRange} from "@model/filter/NumberRange";

export class ManufactureFilter extends TableFilter {

  types: number[] = [];

  count: NumberRange = new NumberRange();

  hrInvolved: NumberRange = new NumberRange();

}
