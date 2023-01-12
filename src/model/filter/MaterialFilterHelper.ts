import {MaterialFilter} from "@model/filter/MaterialFilter";
import {emptyMaterialFilter} from "@util/FilterUtil";
import {NumberRange} from "@model/filter/NumberRange";
import {Subject} from "rxjs";

// todo era rename to FilterChangeReactor or smth like this
export class MaterialFilterHelper {

  private readonly filter: MaterialFilter = emptyMaterialFilter();

  constructor(private readonly filterChangeSubject: Subject<MaterialFilter>) {
  }

  onNameChange = (name: string): void => {
    this.filter.materialName = name;
    this.emit();
  }

  onCountriesChange = (countries: string[]): void => {
    this.filter.countries = countries;
    this.emit();
  }

  onDepartmentsChange = (departments: string[]): void => {
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

  private emit(): void {
    this.filterChangeSubject.next(this.filter);
  }

}
