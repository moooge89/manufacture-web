import {SortType} from "@model/web/SortType";

export class Sorting {

  fieldName: string = '';

  sortType: SortType = SortType.ASC;

  constructor(_fieldName: string, _sortType: SortType) {
    this.fieldName = _fieldName;
    this.sortType = _sortType;
  }

  static asc(fieldName: string): Sorting {
    return new Sorting(fieldName, SortType.ASC);
  }

  static desc(fieldName: string): Sorting {
    return new Sorting(fieldName, SortType.ASC);
  }

  isAsc(): boolean {
    return this.sortType === SortType.ASC;
  }

  isDesc(): boolean {
    return this.sortType === SortType.DESC;
  }

}
