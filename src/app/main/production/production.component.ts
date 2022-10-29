import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamProductionInfo} from "@model/api/production/TeamProductionInfo";
import {Unsub} from "@util/Unsub";
import {ProductionController} from "@controller/ProductionController";
import {TeamProductionFilter} from "@model/api/production/TeamProductionFilter";
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

  productionInfo: TeamProductionInfo[] = [];

  factoriesToShow: FilterElement[] = [];
  departmentsToShow: FilterElement[] = [];

  selectedFactoryIdToChild: string | undefined;
  selectedDepartmentIdToChild: string | undefined;

  private currentFactoryIndex: number = 0;
  private currentDepartmentIndex: number = 0;
  private filterDesc: ProductionFactoryFilterDescription[] = [];

  private readonly unsub = new Unsub();
  private readonly filterChangedSubject = new Subject<TeamProductionFilter>();

  constructor(private readonly productionController: ProductionController) {
  }

  ngOnInit() {
    this.unsub.sub = this.filterChangedSubject.pipe(
      switchMap(filter => this.productionController.loadTeamProductionInfo(filter))
    ).subscribe(productionInfo => this.productionInfo = productionInfo);

    this.unsub.sub = this.productionController.loadTeamProductionFilterDescription().subscribe(
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
    this.currentDepartmentIndex = 0;

    this.departmentsToShow = this.filterDesc[index].departments;
    this.selectedDepartmentIdToChild = this.departmentsToShow[0].id;

    this.filterChangedSubject.next({
      factoryId: this.factoriesToShow[this.currentFactoryIndex].id,
      departmentId: this.departmentsToShow[this.currentDepartmentIndex].id,
    });
  }

  onDepartmentChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedDepartmentId = elementIds[0];
    const index = this.departmentsToShow.findIndex(x => x.id === selectedDepartmentId);

    if (index < 0) {
      throw new Error(`Cannot find department with ID ${selectedDepartmentId}`);
    }

    this.currentDepartmentIndex = index;

    this.filterChangedSubject.next({
      factoryId: this.factoriesToShow[this.currentFactoryIndex].id,
      departmentId: this.departmentsToShow[this.currentDepartmentIndex].id,
    });
  }

  private initFirstFilter(filterDescriptions: ProductionFactoryFilterDescription[]): void {

    if (!filterDescriptions || filterDescriptions.length === 0) {
      throw new Error('Cannot found any factory');
    }

    const firstFactory = filterDescriptions[0];

    if (!firstFactory?.departments || firstFactory.departments.length === 0) {
      throw new Error('Cannot found any department');
    }

    this.factoriesToShow = filterDescriptions.map(x => x.filterElement);
    this.departmentsToShow = firstFactory.departments;
    this.filterDesc = filterDescriptions;

    this.selectedFactoryIdToChild = firstFactory.filterElement.id;
    this.selectedDepartmentIdToChild = firstFactory.departments[0].id;

    this.filterChangedSubject.next({
      factoryId: this.selectedFactoryIdToChild,
      departmentId: this.selectedDepartmentIdToChild,
    });
  }

}
