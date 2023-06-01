import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterElement} from "@model/filter/FilterElement";
import {Unsub} from "@util/Unsub";
import {ReportController} from "@controller/ReportController";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReportDescription} from "@model/report/ReportDescription";
import {ReportDialogComponent} from "../../dialogue/report/report-dialog.component";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {Cache} from "@util/Cache";
import {DepartmentController} from "@controller/DepartmentController";
import {TeamController} from "@controller/TeamController";
import {FactoryController} from "@controller/FactoryController";
import {ReportFilter} from "@model/report/ReportFilter";
import {UserInfo} from "@model/auth/UserInfo";
import {Specialization} from "@model/user/Specialization";
import {AuthService} from "@service/auth/auth.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  factories: FilterElement[] = [];

  firstDepartments: FilterElement[] = [];
  firstTeams: FilterElement[] = [];

  secondDepartments: FilterElement[] = [];
  secondTeams: FilterElement[] = [];

  reportFilter = new ReportFilter();

  isReportBeingGenerated: boolean = false;
  isReportGenerated: boolean = false;

  isFactoryOptionDisabled: boolean = false;
  isDepartmentOptionDisabled: boolean = false;

  private departmentCache = new Cache<FilterElement[]>();
  private teamCache = new Cache<FilterElement[]>();

  private reportDescription: ReportDescription | undefined;

  private dialogRef: MatDialogRef<ReportDialogComponent> | undefined;
  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly authService: AuthService,
              private readonly teamController: TeamController,
              private readonly reportController: ReportController,
              private readonly factoryController: FactoryController,
              private readonly departmentController: DepartmentController,) {
  }

  async ngOnInit() {
    const userInfo = await this.authService.userInfo();

    await this.disableOptionFactoryIfNeeded(userInfo);
    await this.disableOptionDepartmentIfNeeded(userInfo);

    this.unsub.sub = this.factoryController.loadFactoriesAsFilterElements().subscribe(factories => this.factories = factories);
  }

  ngOnDestroy() {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
  }

  getId = getIdFromFe;

  getName = getNameFromFe;

  async onFirstFactoryChange(elements: FilterElement[]): Promise<void> {
    if (elements.length === 0) return;

    const selectedFactoryId = elements[0].id;

    this.reportFilter.firstFactoryId = selectedFactoryId;
    this.reportFilter.clearFirstDepartment();
    this.reportFilter.clearFirstTeam();

    this.firstDepartments = await this.departmentCache.computeIfAbsent(selectedFactoryId, this.departmentsPromise(selectedFactoryId));
    this.firstTeams = [];
  }

  async onFirstDepartmentChange(elements: FilterElement[]): Promise<void> {
    if (elements.length === 0) return;

    const selectedDepartmentId = elements[0].id;
    this.reportFilter.firstDepartmentId = selectedDepartmentId;
    this.reportFilter.clearFirstTeam();

    this.firstTeams = await this.teamCache.computeIfAbsent(selectedDepartmentId, this.teamsToPromise(selectedDepartmentId));
  }

  onFirstTeamChange(elementIds: number[]): void {
    if (elementIds?.length === 0) return;

    this.reportFilter.firstTeamId = elementIds[0];
  }

  async onSecondFactoryChange(elements: FilterElement[]): Promise<void> {
    if (elements.length === 0) return;

    const selectedFactoryId = elements[0].id;

    this.reportFilter.secondFactoryId = selectedFactoryId;
    this.reportFilter.clearSecondDepartment();
    this.reportFilter.clearSecondTeam();

    this.secondDepartments = await this.departmentCache.computeIfAbsent(selectedFactoryId, this.departmentsPromise(selectedFactoryId));
    this.secondTeams = [];
  }

  async onSecondDepartmentChange(elements: FilterElement[]): Promise<void> {
    if (elements.length === 0) return;

    const selectedDepartmentId = elements[0].id;
    this.reportFilter.secondDepartmentId = selectedDepartmentId;
    this.reportFilter.clearSecondTeam();

    this.secondTeams = await this.teamCache.computeIfAbsent(selectedDepartmentId, this.teamsToPromise(selectedDepartmentId));
  }

  onSecondTeamChange(elementIds: number[]): void {
    if (elementIds?.length === 0) return;

    this.reportFilter.secondTeamId = elementIds[0];
  }

  generateReport(): void {
    this.isReportBeingGenerated = true;
    this.unsub.sub = this.reportController.loadReportDescription(this.reportFilter).subscribe(description => {
      this.isReportBeingGenerated = false;
      this.isReportGenerated = true;
      this.reportDescription = description;
      this.openDialog(description, false);
    });
  }

  seeGeneratedReport(useCoeff: boolean): void {
    if (!this.reportDescription) return;

    this.openDialog(this.reportDescription, useCoeff);
  }

  private openDialog(reportDescription: ReportDescription, useCoeff: boolean): void {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '1080px',
      height: '500px',
      data: {reportDescription: reportDescription, showCoeff: useCoeff},
    });
  }

  private departmentsPromise(factoryId: number): Promise<FilterElement[]> {
    return this.departmentController.loadDepartmentsOfFactoryAsFilterElements(factoryId).toPromise();
  }

  private teamsToPromise(departmentId: number): Promise<FilterElement[]> {
    return this.teamController.loadTeamsOfDepartmentAsFilterElements(departmentId).toPromise();
  }

  private async disableOptionFactoryIfNeeded(userInfo: UserInfo): Promise<void> {
    if (userInfo.specialization === Specialization.COMPANY_DIRECTOR) {
      return;
    }

    this.isFactoryOptionDisabled = true;
    this.reportFilter.firstFactoryId = userInfo.factory;
    this.reportFilter.secondFactoryId = userInfo.factory;

    const departments = await this.departmentCache.computeIfAbsent(userInfo.factory, this.departmentsPromise(userInfo.factory));

    this.firstDepartments = departments;
    this.secondDepartments = departments;
  }

  private async disableOptionDepartmentIfNeeded(userInfo: UserInfo): Promise<void> {
    if (userInfo.specialization === Specialization.COMPANY_DIRECTOR ||
      userInfo.specialization === Specialization.FACTORY_DIRECTOR) {
      return;
    }

    const departments = await this.departmentCache.computeIfAbsent(userInfo.factory, this.departmentsPromise(userInfo.factory));

    this.firstDepartments = departments;
    this.secondDepartments = departments;

    this.isDepartmentOptionDisabled = true;
    this.reportFilter.firstDepartmentId = userInfo.department;
    this.reportFilter.secondDepartmentId = userInfo.department;

    const teams = await this.teamCache.computeIfAbsent(userInfo.department, this.teamsToPromise(userInfo.department));
    this.firstTeams = teams;
    this.secondTeams = teams;
  }

  get emptyMessageForFirstDepartment(): string {
    return this.reportFilter.hasFirstFactory() ? this.defaultEmptyMessage : this.choseFactoryText;
  }

  get emptyMessageForFirstTeam(): string {
    return this.reportFilter.hasFirstDepartment() ? this.defaultEmptyMessage : this.choseDepartmentText;
  }

  get emptyMessageForSecondDepartment(): string {
    return this.reportFilter.hasSecondFactory() ? this.defaultEmptyMessage : this.choseFactoryText;
  }

  get emptyMessageForSecondTeam(): string {
    return this.reportFilter.hasSecondDepartment() ? this.defaultEmptyMessage : this.choseDepartmentText;
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
    return this.isReportBeingGenerated || !this.reportFilter.hasFirstFactory() || !this.reportFilter.hasSecondFactory();
  }

  get generateButtonDisableMsg(): string {
    if (this.isReportBeingGenerated) return 'Report is being generated...';

    if (!this.reportFilter.hasFirstFactory()) return 'Choose first factory';

    if (!this.reportFilter.hasSecondFactory()) return 'Choose second factory';

    return '';
  }

  get isSeeButtonDisabled(): boolean {
    return this.isReportBeingGenerated || !this.isReportGenerated;
  }

  get seeButtonDisabledMsg(): string {
    return 'Generate report first';
  }

}
