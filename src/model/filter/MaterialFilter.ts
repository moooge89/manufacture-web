import {NumberRange} from "@model/filter/NumberRange";
import {TableFilter} from "@model/filter/TableFilter";
import {Sorting} from "@model/web/Sorting";
import {SortType} from "@model/web/SortType";

export class MaterialFilter implements TableFilter {

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

  sorting: Sorting = {
    sortType: SortType.ASC,
    fieldName: ''
  };

}
