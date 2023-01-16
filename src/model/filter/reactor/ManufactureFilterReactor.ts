import {FilterReactor} from "@model/filter/reactor/FilterReactor";
import {ManufactureFilter} from "@model/filter/ManufactureFilter";
import {Subject} from "rxjs";
import {NumberRange} from "@model/filter/NumberRange";

export class ManufactureFilterReactor extends FilterReactor<ManufactureFilter> {

  constructor(filterChangeSubject: Subject<ManufactureFilter>) {
    super(filterChangeSubject);
  }

  initFilter(): ManufactureFilter {
    return new ManufactureFilter();
  }

  onTypesChange = (types: string[]): void => {
    this.filter.types = types;
    this.emit();
  }

  onCountChange = (count: NumberRange): void => {
    this.filter.count = count;
    this.emit();
  }

  onHrInvolvedChange = (hrInvolved: NumberRange): void => {
    this.filter.hrInvolved = hrInvolved;
    this.emit();
  }

}
