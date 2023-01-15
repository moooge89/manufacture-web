import {Subject} from "rxjs";
import {Filter} from "@model/filter/Filter";

export abstract class FilterReactor<T extends Filter> {

  protected readonly filter: T;

  protected constructor(private readonly filterChangeSubject: Subject<T>) {
    this.filter = this.initFilter();
  }

  abstract initFilter(): T;

  protected emit(): void {
    this.filterChangeSubject.next(this.filter);
  }

}
