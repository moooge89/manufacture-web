import {NumberRange} from "@model/filter/NumberRange";
import {TableFilter} from "@model/filter/TableFilter";

export class MaterialFilter extends TableFilter {

  materialName: string = '';

  available: NumberRange = {
    min: undefined,
    max: undefined,
  };

  price: NumberRange = {
    min: undefined,
    max: undefined,
  };

  departments: string[] = [];

  countries: string[] = [];

}
