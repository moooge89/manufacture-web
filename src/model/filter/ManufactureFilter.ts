import {TableFilter} from "@model/filter/TableFilter";
import {NumberRange} from "@model/filter/NumberRange";
import {Sorting} from "@model/web/Sorting";
import {SortType} from "@model/web/SortType";

export class ManufactureFilter implements TableFilter {

  types: string[] = [];

  count: NumberRange = {
    min: undefined,
    max: undefined,
  };

  hrInvolved: NumberRange = {
    min: undefined,
    max: undefined,
  };

  sorting: Sorting = {
    sortType: SortType.ASC,
    fieldName: ''
  };

}
