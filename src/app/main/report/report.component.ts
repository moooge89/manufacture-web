import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterElement} from "@model/filter/FilterElement";
import {Unsub} from "@util/Unsub";
import {ReportController} from "@controller/ReportController";
import {ReportFactoryFilterDescription} from "@model/api/report/ReportFactoryFilterDescription";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReportDialogComponent} from "@shared/report-dialog/report-dialog.component";
import {ReportDescription} from "@model/report/ReportDescription";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  factoriesToShow: FilterElement[] = [];
  firstDepartmentsToShow: FilterElement[] = [];
  firstTeamsToShow: FilterElement[] = [];

  secondFactoriesToShow: FilterElement[] = [];
  secondDepartmentsToShow: FilterElement[] = [];
  secondTeamsToShow: FilterElement[] = [];

  firstFactoryId: string | undefined;
  firstDepartmentId: string | undefined;
  firstTeamId: string | undefined;

  secondFactoryId: string | undefined;
  secondDepartmentId: string | undefined;
  secondTeamId: string | undefined;

  firstFactoryIndex: number = 0;
  secondFactoryIndex: number = 0;

  isReportBeingGenerated: boolean = false;

  private dialogRef: MatDialogRef<ReportDialogComponent> | undefined;
  private filterDescriptions: ReportFactoryFilterDescription[] = [];
  private reportDescription: ReportDescription | undefined;
  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly reportController: ReportController) {
  }

  ngOnInit() {
    this.unsub.sub = this.reportController.loadReportFilterDescription().subscribe(
      filterDescriptions => this.initFilterDescription(filterDescriptions)
    );
  }

  ngOnDestroy() {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
  }

  getId = (element: FilterElement) => element.id;

  getName = (element: FilterElement) => element.name;

  onFirstFactoryChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedFactoryId = elementIds[0];
    const index = this.factoriesToShow.findIndex(x => x.id === selectedFactoryId);

    if (index < 0) {
      throw new Error(`Cannot find factory with ID ${selectedFactoryId}`);
    }

    this.firstFactoryId = selectedFactoryId;
    this.firstDepartmentId = undefined;
    this.firstTeamId = undefined;

    this.firstFactoryIndex = index;

    this.firstDepartmentsToShow = this.filterDescriptions[index].departments.map(x => x.filterElement);
    this.firstTeamsToShow = [];
  }

  onFirstDepartmentChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedDepartmentId = elementIds[0];
    const index = this.firstDepartmentsToShow.findIndex(x => x.id === selectedDepartmentId);

    if (index < 0) {
      throw new Error(`Cannot find department with ID ${selectedDepartmentId}`);
    }

    this.firstDepartmentId = selectedDepartmentId;
    this.firstTeamId = undefined;

    this.firstTeamsToShow = this.filterDescriptions[this.firstFactoryIndex].departments[index].teams;
  }

  onFirstTeamChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    this.firstTeamId = elementIds[0];
  }

  onSecondFactoryChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedFactoryId = elementIds[0];
    const index = this.factoriesToShow.findIndex(x => x.id === selectedFactoryId);

    if (index < 0) {
      throw new Error(`Cannot find factory with ID ${selectedFactoryId}`);
    }

    this.secondFactoryId = selectedFactoryId;
    this.secondDepartmentId = undefined;
    this.secondTeamId = undefined;

    this.secondFactoryIndex = index;

    this.secondDepartmentsToShow = this.filterDescriptions[index].departments.map(x => x.filterElement);
    this.secondTeamsToShow = [];
  }

  onSecondDepartmentChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    const selectedDepartmentId = elementIds[0];
    const index = this.secondDepartmentsToShow.findIndex(x => x.id === selectedDepartmentId);

    if (index < 0) {
      throw new Error(`Cannot find department with ID ${selectedDepartmentId}`);
    }

    this.secondDepartmentId = selectedDepartmentId;
    this.secondTeamId = undefined;

    this.secondTeamsToShow = this.filterDescriptions[this.secondFactoryIndex].departments[index].teams;
  }

  onSecondTeamChange(elementIds: string[]): void {
    if (elementIds?.length === 0) return;

    this.secondTeamId = elementIds[0];
  }

  generateReport(): void {
    this.unsub.sub = this.reportController.loadReportDescription().subscribe(description => {
        this.reportDescription = description;
        this.openDialog();
      }
    );
  }

  private openDialog(): void {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '1080px',
      height: '500px',
      data: {reportDescription: this.reportDescription},
    });
  }

  private initFilterDescription(filterDescriptions: ReportFactoryFilterDescription[]): void {
    this.filterDescriptions = filterDescriptions;
    this.factoriesToShow = filterDescriptions.map(x => x.filterElement);
  }

  get emptyMessageForFirstDepartment(): string {
    return this.firstFactoryId ? this.defaultEmptyMessage : this.choseFactoryText;
  }

  get emptyMessageForFirstTeam(): string {
    return this.firstDepartmentId ? this.defaultEmptyMessage : this.choseDepartmentText;
  }

  get emptyMessageForSecondDepartment(): string {
    return this.secondFactoryId ? this.defaultEmptyMessage : this.choseFactoryText;
  }

  get emptyMessageForSecondTeam(): string {
    return this.secondDepartmentId ? this.defaultEmptyMessage : this.choseDepartmentText;
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

  get disabledButtonMsg(): string {
    if (this.isReportBeingGenerated) return 'Report is being generated...';

    if (!this.firstFactoryId) return 'Choose first factory';

    if (!this.secondFactoryId) return 'Choose second factory';

    return '';
  }

  get isButtonDisabled(): boolean {
    return this.isReportBeingGenerated || !this.firstFactoryId || !this.secondFactoryId;
  }

}
