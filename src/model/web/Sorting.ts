import {SortType} from "@model/web/SortType";

export class Sorting {

  // todo era make default fieldName
  fieldName: string = '';

  sortType: SortType = SortType.ASC;

  constructor(init?: Partial<Sorting>) {
    Object.assign(this, init);
  }

  static emptyAsc(): Sorting {
    return new Sorting();
  }

  static emptyDesc(): Sorting {
    return new Sorting({sortType: SortType.DESC});
  }

  isAsc(): boolean {
    return this.sortType === SortType.ASC;
  }

  isDesc(): boolean {
    return this.sortType === SortType.DESC;
  }

}
