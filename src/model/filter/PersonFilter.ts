import {TableFilter} from "@model/filter/TableFilter";
import {Sorting} from "@model/web/Sorting";
import {SortType} from "@model/web/SortType";

export class PersonFilter extends TableFilter {

  personName: string = '';

  factoryIds: number[] = [];

  departmentIds: number[] = [];

  sorting = new Sorting('personName', SortType.ASC);

  constructor(init?: Partial<PersonFilter>) {
    super();
    Object.assign(this, init);
  }

}
