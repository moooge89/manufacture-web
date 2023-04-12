import {SortType} from "@model/web/SortType";

export class Sorting {

  fieldName: string = '';

  sortType: SortType = SortType.ASC;

  constructor(init?: Partial<Sorting>) {
    Object.assign(this, init);
  }

  static asc(fieldName: string): Sorting {
    return new Sorting({fieldName: fieldName, sortType: SortType.ASC});
  }

  static desc(fieldName: string): Sorting {
    return new Sorting({fieldName: fieldName, sortType: SortType.DESC});
  }

  isAsc(): boolean {
    return this.sortType === SortType.ASC;
  }

  isDesc(): boolean {
    return this.sortType === SortType.DESC;
  }

}
