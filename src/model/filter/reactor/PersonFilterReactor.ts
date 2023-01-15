import {Subject} from "rxjs";
import {PersonFilter} from "@model/filter/PersonFilter";
import {FilterReactor} from "@model/filter/reactor/FilterReactor";

export class PersonFilterReactor extends FilterReactor<PersonFilter> {

  constructor(filterChangeSubject: Subject<PersonFilter>) {
    super(filterChangeSubject);
  }

  initFilter(): PersonFilter {
    return new PersonFilter();
  }

  onNameChange = (name: string): void => {
    this.filter.personName = name;
    this.emit();
  }

  onFactoriesChange = (factoryIds: string[]): void => {
    this.filter.factoryIds = factoryIds;
    this.emit();
  }

  onDepartmentsChange = (departmentIds: string[]): void => {
    this.filter.departmentIds = departmentIds;
    this.emit();
  }

}
