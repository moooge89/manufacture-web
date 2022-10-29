import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductionInfo} from "@model/api/production/ProductionInfo";
import {Unsub} from "@util/Unsub";
import {ProductionController} from "@controller/ProductionController";
import {ProductionFilter} from "@model/api/production/ProductionFilter";
import {FilterElement} from "@model/filter/FilterElement";
import {Subject} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ProductionFactoryFilterDescription} from "@model/api/production/ProductionFactoryFilterDescription";

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit, OnDestroy {

  productionInfo: ProductionInfo[] = [];

  factoriesToShow: FilterElement[] = [];
  departmentsToShow: FilterElement[] = [];

  currentFactoryId: string = '';
  currentDepartmentId: string = '';

  private currentFactoryIndex: number = 0;
  private currentDepartmentIndex: number = 0;
  private filterDesc: ProductionFactoryFilterDescription[] = [];

  private lastFactoryIndex: number = 0;
  private lastDepartmentIndex: number = 0;

  private readonly unsub = new Unsub();
  private readonly filterChangedSubject = new Subject<ProductionFilter>();

  constructor(private readonly productionController: ProductionController) {
  }

  ngOnInit() {
    this.unsub.sub = this.filterChangedSubject.pipe(
      switchMap(filter => this.productionController.loadProductionInfo(filter))
    ).subscribe(productionInfo => this.productionInfo = productionInfo);

    this.unsub.sub = this.productionController.loadProductionFilterDescription().subscribe(
      filterDescription => this.initFirstFilter(filterDescription)
    );
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

  onFactoryChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedFactoryId = elementIds[0];
    const index = this.factoriesToShow.findIndex(x => x.id === selectedFactoryId);

    if (index < 0) {
      throw new Error(`Cannot find factory with ID ${selectedFactoryId}`);
    }

    this.currentFactoryIndex = index;
    this.updateCurrentFactoryId();

    this.currentDepartmentIndex = 0;
    this.updateCurrentDepartmentId();

    this.emitValuesToFilter();
  }

  onDepartmentChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedDepartmentId = elementIds[0];
    const index = this.departmentsToShow.findIndex(x => x.id === selectedDepartmentId);

    if (index < 0) {
      throw new Error(`Cannot find department with ID ${selectedDepartmentId}`);
    }

    this.currentDepartmentIndex = index;
    this.updateCurrentDepartmentId();

    this.emitValuesToFilter();
  }

  onPrevClick(): void {
    if (!this.isPrevClickable) return;

    if (this.currentDepartmentIndex === 0) {
      this.currentFactoryIndex--;
      this.updateCurrentFactoryId();

      this.currentDepartmentIndex = this.departmentsToShow.length - 1;
    } else {
      this.currentDepartmentIndex--;
    }

    this.updateCurrentDepartmentId();
    this.emitValuesToFilter();
  }

  onNextClick(): void {
    if (!this.isNextClickable) return;

    if (this.isCurrentDepartmentIsLastInFactory) {
      this.currentFactoryIndex++;
      this.updateCurrentFactoryId();

      this.currentDepartmentIndex = 0;
    } else {
      this.currentDepartmentIndex++;
    }

    this.updateCurrentDepartmentId();
    this.emitValuesToFilter();
  }

  private initFirstFilter(filterDescriptions: ProductionFactoryFilterDescription[]): void {
    if (!filterDescriptions || filterDescriptions.length === 0 || filterDescriptions[0].departments.length === 0) {
      throw new Error('Cannot found any factory or department');
    }

    this.filterDesc = filterDescriptions;
    this.factoriesToShow = filterDescriptions.map(x => x.filterElement);

    this.updateCurrentFactoryId();
    this.updateCurrentDepartmentId();

    const lastFactory = filterDescriptions[filterDescriptions.length - 1];

    this.lastFactoryIndex = filterDescriptions.length - 1;
    this.lastDepartmentIndex = lastFactory.departments.length - 1;

    this.emitValuesToFilter();
  }

  private emitValuesToFilter(): void {
    this.filterChangedSubject.next({
      factoryId: this.currentFactoryId,
      departmentId: this.currentDepartmentId,
    });
  }

  private updateCurrentFactoryId(): void {
    const factory = this.filterDesc[this.currentFactoryIndex];
    this.currentFactoryId = factory.filterElement.id;
    this.departmentsToShow = factory.departments;
  }

  private updateCurrentDepartmentId(): void {
    this.currentDepartmentId = this.departmentsToShow[this.currentDepartmentIndex].id;
  }

  get isPrevClickable(): boolean {
    return this.currentFactoryIndex !== 0 || (this.currentFactoryIndex === 0 && this.currentDepartmentIndex !== 0);
  }

  get isNextClickable(): boolean {
    return this.currentFactoryIndex !== this.lastFactoryIndex ||
      (this.currentFactoryIndex === this.lastFactoryIndex && this.currentDepartmentIndex !== this.lastDepartmentIndex);
  }

  get isCurrentDepartmentIsLastInFactory(): boolean {
    return this.departmentsToShow.length === this.currentDepartmentIndex + 1;
  }

}
