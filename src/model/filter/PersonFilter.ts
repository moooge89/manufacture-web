import {TableFilter} from "@model/filter/TableFilter";

export class PersonFilter extends TableFilter {

  personName: string = '';

  factoryIds: number[] = [];

  departmentIds: number[] = [];

  constructor(init?: Partial<PersonFilter>) {
    super();
    Object.assign(this, init);
  }

}
