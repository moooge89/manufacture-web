import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Unsub} from "@util/Unsub";
import {FilterController} from "@controller/FilterController";
import {MaterialFilterDescription} from "@model/filter/MaterialFilterDescription";
import {MaterialFilterMetaInfo} from "@model/filter/MaterialFilterMetaInfo";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {NumberRange} from "@model/filter/NumberRange";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {PathContextService} from "@service/path-context/path-context.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
// todo era delete component
export class FilterComponent implements OnInit, OnDestroy {

  filterDescription: MaterialFilterDescription | undefined;

  @Input() filterMetaInfo: MaterialFilterMetaInfo = {
    useAvailable: true,
    useCountries: true,
    useDepartments: true,
    useMaterialName: true,
    usePrice: true,
  };

  @Input() isMarketFilter: boolean = false;

  @Output() filterChanged = new EventEmitter<MaterialFilter>();

  materialName: string = '';

  private filter: MaterialFilter = new MaterialFilter();

  private readonly filterChangeSubject = new Subject<MaterialFilter>();
  private readonly unsub = new Unsub();

  constructor(
    private readonly filterController: FilterController,
    private readonly pathContextService: PathContextService,
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

    this.handleMarketFilter();
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  getId = getIdFromFe;

  getName = getNameFromFe;

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

  private handleMarketFilter() {
    const materialName = this.pathContextService.materialName;

    if (!materialName) {
      return;
    }

    this.materialName = materialName;
    this.onMaterialNameChange(materialName);
  }

}
