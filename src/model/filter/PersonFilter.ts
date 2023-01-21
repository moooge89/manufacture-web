import {TableFilter} from "@model/filter/TableFilter";
import {Sorting} from "@model/web/Sorting";
import {SortType} from "@model/web/SortType";

export class PersonFilter implements TableFilter {

  personName: string = '';

  factoryIds: string[] = [];

  departmentIds: string[] = [];

  sorting: Sorting = {
    sortType: SortType.ASC,
    fieldName: ''
  };

}
