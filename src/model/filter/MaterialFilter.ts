import {NumberRange} from "@model/filter/NumberRange";
import {Filter} from "@model/filter/Filter";

export class MaterialFilter implements Filter {

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
