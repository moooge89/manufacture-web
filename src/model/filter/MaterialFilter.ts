import {NumberRange} from "@model/filter/NumberRange";
import {TableFilter} from "@model/filter/TableFilter";
import {Sorting} from "@model/web/Sorting";
import {SortType} from "@model/web/SortType";

export class MaterialFilter extends TableFilter {

  materialName: string = '';

  available: NumberRange = new NumberRange();

  price: NumberRange = new NumberRange();

  departments: number[] = [];

  countries: number[] = [];

  sorting = new Sorting({fieldName: 'name', sortType: SortType.ASC});

}
