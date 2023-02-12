import {SortType} from "@model/web/SortType";

export class Sorting {

  fieldName: string = '';

  sortType: SortType = SortType.ASC;

  constructor(init?: Partial<Sorting>) {
    Object.assign(this, init);
  }

}
