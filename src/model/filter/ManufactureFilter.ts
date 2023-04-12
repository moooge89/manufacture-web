import {TableFilter} from "@model/filter/TableFilter";
import {NumberRange} from "@model/filter/NumberRange";
import {Sorting} from "@model/web/Sorting";
import {SortType} from "@model/web/SortType";

export class ManufactureFilter extends TableFilter {

  types: number[] = [];

  count: NumberRange = new NumberRange();

  hrInvolved: NumberRange = new NumberRange();

  sorting = new Sorting({fieldName: 'types', sortType: SortType.ASC});

}
