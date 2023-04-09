import {MaterialFilter} from "@model/filter/MaterialFilter";
import {NumberRange} from "@model/filter/NumberRange";
import {Subject} from "rxjs";
import {FilterReactor} from "@model/filter/reactor/FilterReactor";

export class MaterialFilterReactor extends FilterReactor<MaterialFilter> {

  constructor(filterChangeSubject: Subject<MaterialFilter>) {
    super(filterChangeSubject);
  }

  initFilter(): MaterialFilter {
    return new MaterialFilter();
  }

  onNameChange = (name: string): void => {
    this.filter.materialName = name;
    this.emit();
  }

  onCountriesChange = (countries: number[]): void => {
    this.filter.countries = countries;
    this.emit();
  }

  onDepartmentsChange = (departments: number[]): void => {
    this.filter.departments = departments;
    this.emit();
  }

  onPriceChange = (price: NumberRange): void => {
    this.filter.price = price;
    this.emit();
  }

  onAvailableChange = (available: NumberRange): void => {
    this.filter.available = available;
    this.emit();
  }

}
