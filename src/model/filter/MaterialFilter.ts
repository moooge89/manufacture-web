import {NumberRange} from "@model/filter/NumberRange";
import {TableFilter} from "@model/filter/TableFilter";

export class MaterialFilter extends TableFilter {

  materialName: string = '';

  available: NumberRange = new NumberRange();

  price: NumberRange = new NumberRange();

  departments: number[] = [];

  countries: number[] = [];

}
