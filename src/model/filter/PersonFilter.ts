import {TableFilter} from "@model/filter/TableFilter";

export class PersonFilter extends TableFilter {

  personName: string = '';

  factoryIds: string[] = [];

  departmentIds: string[] = [];

  constructor(init?: Partial<PersonFilter>) {
    super();
    Object.assign(this, init);
  }

}
