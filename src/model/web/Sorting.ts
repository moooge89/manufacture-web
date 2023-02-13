import {SortType} from "@model/web/SortType";

// todo era add methods
export class Sorting {

  fieldName: string = '';

  sortType: SortType = SortType.ASC;

  constructor(init?: Partial<Sorting>) {
    Object.assign(this, init);
  }

}
