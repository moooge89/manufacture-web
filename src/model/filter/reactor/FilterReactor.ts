import {Subject} from "rxjs";
import {TableFilter} from "@model/filter/TableFilter";
import {Sorting} from "@model/web/Sorting";

export abstract class FilterReactor<T extends TableFilter> {

  protected readonly filter: T;

  protected constructor(private readonly filterChangeSubject: Subject<T>) {
    this.filter = this.initFilter();
  }

  abstract initFilter(): T;

  protected emit(): void {
    this.filterChangeSubject.next(this.filter);
  }

  onSortChange(sorting: Sorting): void {
    this.filter.sorting = sorting;
    this.emit();
  }

}
