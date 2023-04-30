import {Component} from '@angular/core';
import {FilterElement} from "@model/filter/FilterElement";
import {Cache} from "@util/Cache";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Unsub} from "@util/Unsub";
import {TeamController} from "@controller/TeamController";
import {FactoryController} from "@controller/FactoryController";
import {DepartmentController} from "@controller/DepartmentController";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {AnalyticsDialogComponent} from "../../dialogue/analytics/analytics-dialog.component";
import {AnalyticsController} from "@controller/AnalyticsController";
import {AnalyticsFilter} from "@model/analytics/AnalyticsFilter";
import {AnalyticsDescription} from "@model/analytics/AnalyticsDescription";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

  factories: FilterElement[] = [];
  departments: FilterElement[] = [];
  teams: FilterElement[] = [];

  analyticsFilter = new AnalyticsFilter();

  isAnalyticsBeingGenerated: boolean = false;
  isAnalyticsGenerated: boolean = false;

  private departmentCache = new Cache<FilterElement[]>();
  private teamCache = new Cache<FilterElement[]>();

  private analyticsDescription: AnalyticsDescription | undefined;

  private dialogRef: MatDialogRef<AnalyticsDialogComponent> | undefined;
  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly teamController: TeamController,
              private readonly factoryController: FactoryController,
              private readonly analyticsController: AnalyticsController,
              private readonly departmentController: DepartmentController,) {
  }

  ngOnInit() {
    this.unsub.sub = this.factoryController.loadFactoriesAsFilterElements().subscribe(factories => this.factories = factories);
  }

  ngOnDestroy() {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
  }

  getId = getIdFromFe;

  getName = getNameFromFe;

  async onFactoryChange(elements: FilterElement[]): Promise<void> {
    if (elements.length === 0) return;

    const selectedFactoryId = elements[0].id;

    this.analyticsFilter.factoryId = selectedFactoryId;
    this.analyticsFilter.clearDepartment();
    this.analyticsFilter.clearTeam();

    this.departments = await this.departmentCache.computeIfAbsent(selectedFactoryId, this.departmentsPromise(selectedFactoryId));
    this.teams = [];
  }

  async onDepartmentChange(elements: FilterElement[]): Promise<void> {
    if (elements.length === 0) return;

    const selectedDepartmentId = elements[0].id;
    this.analyticsFilter.departmentId = selectedDepartmentId;
    this.analyticsFilter.clearTeam();

    this.teams = await this.teamCache.computeIfAbsent(selectedDepartmentId, this.teamsToPromise(selectedDepartmentId));
  }

  onTeamChange(elementIds: number[]): void {
    if (elementIds?.length === 0) return;

    this.analyticsFilter.teamId = elementIds[0];
  }

  generateAnalytics(): void {
    this.isAnalyticsBeingGenerated = true;
    this.unsub.sub = this.analyticsController.loadAnalyticsDescription(this.analyticsFilter).subscribe(description => {
      this.isAnalyticsBeingGenerated = false;
      this.isAnalyticsGenerated = true;
      this.analyticsDescription = description;
      this.openDialog(description);
    });
  }

  seeGeneratedAnalytics(): void {
    if (!this.analyticsDescription) return;

    this.openDialog(this.analyticsDescription);
  }

  private openDialog(analyticsDescription: AnalyticsDescription): void {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(AnalyticsDialogComponent, {
      width: '1080px',
      height: '500px',
      data: {description: analyticsDescription},
    });
  }

  private departmentsPromise(factoryId: number): Promise<FilterElement[]> {
    return this.departmentController.loadDepartmentsOfFactoryAsFilterElements(factoryId).toPromise();
  }

  private teamsToPromise(departmentId: number): Promise<FilterElement[]> {
    return this.teamController.loadTeamsOfDepartmentAsFilterElements(departmentId).toPromise();
  }

  get emptyMessageForDepartment(): string {
    return this.analyticsFilter.hasFactory() ? this.defaultEmptyMessage : this.choseFactoryText;
  }

  get emptyMessageForTeam(): string {
    return this.analyticsFilter.hasDepartment() ? this.defaultEmptyMessage : this.choseDepartmentText;
  }

  get defaultEmptyMessage(): string {
    return 'No element can be found';
  }

  get choseFactoryText(): string {
    return 'Choose factory first';
  }

  get choseDepartmentText(): string {
    return 'Choose department first';
  }

  get isGenerateButtonDisabled(): boolean {
    return this.isAnalyticsBeingGenerated || !this.analyticsFilter.hasFactory();
  }

  get generateButtonDisableMsg(): string {
    if (this.isAnalyticsBeingGenerated) return 'Analytics is being generated...';

    if (!this.analyticsFilter.hasFactory()) return 'Choose factory';

    return '';
  }

  get isSeeButtonDisabled(): boolean {
    return this.isAnalyticsBeingGenerated || !this.isAnalyticsGenerated;
  }

  get seeButtonDisabledMsg(): string {
    return 'Generate analytics first';
  }

}
