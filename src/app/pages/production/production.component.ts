import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductionInfo} from "@model/api/production/ProductionInfo";
import {Unsub} from "@util/Unsub";
import {ProductionController} from "@controller/ProductionController";
import {ProductionFilter} from "@model/api/production/ProductionFilter";
import {FilterElement} from "@model/filter/FilterElement";
import {Subject} from "rxjs";
import {switchMap} from "rxjs/operators";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {Cache} from "@util/Cache";
import {FactoryController} from "@controller/FactoryController";
import {DepartmentController} from "@controller/DepartmentController";

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit, OnDestroy {

  productionInfo: ProductionInfo[] = [];

  factories: FilterElement[] = [];
  departments: FilterElement[] = [];

  filter: ProductionFilter = {
    factoryId: '',
    departmentId: '',
  };

  private currentFactoryIndex: number = 0;
  private currentDepartmentIndex: number = 0;

  private lastFactoryIndex: number = 0;
  private lastDepartmentIndex: number = 0;

  private readonly cache = new Cache<FilterElement[]>();
  private readonly unsub = new Unsub();
  private readonly filterChangedSubject = new Subject<ProductionFilter>();

  constructor(private readonly factoryController: FactoryController,
              private readonly productionController: ProductionController,
              private readonly departmentController: DepartmentController,) {
  }

  ngOnInit() {
    this.unsub.sub = this.factoryController.loadFactoriesAsFilterElements().subscribe(async factories => {
      await this.initFirstFilter(factories)
    });

    this.unsub.sub = this.filterChangedSubject.pipe(
      switchMap(filter => this.productionController.loadProductionInfo(filter))
    ).subscribe(productionInfo => this.productionInfo = productionInfo);
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  getId = getIdFromFe;

  getName = getNameFromFe;

  async onFactoryChange(elementIds: string[]): Promise<void> {
    if (elementIds?.length === 0) return;

    const selectedFactoryId = elementIds[0];
    const index = this.factories.findIndex(x => x.id === selectedFactoryId);

    if (index < 0) {
      throw new Error(`Cannot find factory with ID ${selectedFactoryId}`);
    }

    this.lastFactoryIndex = index;

    await this.updateCurrentFactoryId();
    this.updateCurrentDepartmentId();

    this.emitFilter();
  }

  async onDepartmentChange(elementIds: string[]): Promise<void> {
    if (elementIds?.length === 0) return;

    this.filter.departmentId = elementIds[0];

    this.emitFilter();
  }

  async onPrevClick(): Promise<void> {
    if (!this.isPrevClickable) return;

    if (this.currentDepartmentIndex === 0) {
      this.currentFactoryIndex--;
      await this.updateCurrentFactoryId();

      this.currentDepartmentIndex = this.factories.length - 1;
    } else {
      this.currentDepartmentIndex--;
    }

    this.updateCurrentDepartmentId();
    this.emitFilter();
  }

  async onNextClick(): Promise<void> {
    if (!this.isNextClickable) return;

    if (this.isCurrentDepartmentIsLastInFactory) {
      this.currentFactoryIndex++;
      await this.updateCurrentFactoryId();

      this.currentDepartmentIndex = 0;
    } else {
      this.currentDepartmentIndex++;
    }

    this.updateCurrentDepartmentId();
    this.emitFilter();
  }

  private async initFirstFilter(factories: FilterElement[]): Promise<void> {
    if (factories.length === 0) {
      throw new Error('Cannot find any factory');
    }

    this.factories = factories;
    this.lastFactoryIndex = this.factories.length - 1;

    await this.updateCurrentFactoryId();
    this.updateCurrentDepartmentId();

    this.emitFilter();
  }

  private emitFilter(): void {
    this.filterChangedSubject.next(this.filter);
  }

  private async updateCurrentFactoryId(): Promise<void> {
    const factory = this.factories[this.currentFactoryIndex];
    this.filter.factoryId = factory.id;

    this.departments = await this.cache.computeIfAbsent(factory.id, this.departmentsPromise(factory.id));

    this.currentDepartmentIndex = 0;
    this.lastDepartmentIndex = this.departments.length - 1;

  }

  private updateCurrentDepartmentId(): void {
    this.filter.departmentId = this.departments[this.currentDepartmentIndex].id;
  }

  private departmentsPromise(factoryId: string): Promise<FilterElement[]> {
    return this.departmentController.loadDepartmentsOfFactoryAsFilterElements(factoryId).toPromise();
  }

  get isPrevClickable(): boolean {
    return this.currentFactoryIndex !== 0 || (this.currentFactoryIndex === 0 && this.currentDepartmentIndex !== 0);
  }

  get isNextClickable(): boolean {
    return this.currentFactoryIndex !== this.lastFactoryIndex ||
      (this.currentFactoryIndex === this.lastFactoryIndex && this.currentDepartmentIndex !== this.lastDepartmentIndex);
  }

  get isCurrentDepartmentIsLastInFactory(): boolean {
    return this.departments.length === this.currentDepartmentIndex + 1;
  }

}
