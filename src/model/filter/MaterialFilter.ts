import {NumberRange} from "@model/filter/NumberRange";

export interface MaterialFilter {
  materialName: string;
  available: NumberRange;
  price: NumberRange;
  departments: string[];
  countries: string[];
}
