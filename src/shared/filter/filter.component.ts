import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Unsub} from "@util/Unsub";
import {FilterController} from "@controller/FilterController";
import {MaterialFilterDescription} from "@model/filter/MaterialFilterDescription";
import {FilterElement} from "@model/filter/FilterElement";
import {MaterialFilterMetaInfo} from "@model/filter/MaterialFilterMetaInfo";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {NumberRange} from "@model/filter/NumberRange";
import {defaultFilter} from "@util/FilterUtil";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {

  filterDescription: MaterialFilterDescription | undefined;

  @Input() filterMetaInfo: MaterialFilterMetaInfo = {
    useAvailable: true,
    useCountries: true,
    useDepartments: true,
    useMaterialName: true,
    usePrice: true,
  };

  @Output() filterChanged = new EventEmitter<MaterialFilter>();

  private filter: MaterialFilter = defaultFilter();

  private readonly filterChangeSubject = new Subject<MaterialFilter>();
  private readonly unsub = new Unsub();

  constructor(
    private readonly filterController: FilterController,
  ) {
  }

  ngOnInit() {
    this.unsub.sub = this.filterController.loadFilterDescription().subscribe(
      filterDescription => this.filterDescription = filterDescription
    );

    this.filterChangeSubject.asObservable().pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(res => this.filterChanged.next(res));
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  getId = (element: FilterElement) => {
    return element.id;
  }

  getName = (element: FilterElement) => {
    return element.name;
  }

  onMaterialNameChange(materialName: string): void {
    this.filterChangeSubject.next({...this.filter, materialName: materialName});
  }

  onCountriesChange(countries: string[]): void {
    this.filterChangeSubject.next({...this.filter, countries: countries});
  }

  onDepartmentsChange(departments: string[]): void {
    this.filterChangeSubject.next({...this.filter, departments: departments});
  }

  onPriceChange(price: NumberRange): void {
    this.filterChangeSubject.next({...this.filter, price: price});
  }

  onAvailableChange(available: NumberRange): void {
    this.filterChangeSubject.next({...this.filter, available: available});
  }

}
