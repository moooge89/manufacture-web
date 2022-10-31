import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";
import {ColumnChartOptions} from "@model/chart/ColumnChartOptions";
import {FilterElement} from "@model/filter/FilterElement";
import {Unsub} from "@util/Unsub";
import {ReportController} from "@controller/ReportController";
import {ReportFactoryFilterDescription} from "@model/api/report/ReportFactoryFilterDescription";
import {Subject} from "rxjs";
import {ReportFilter} from "@model/api/report/ReportFilter";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  @ViewChild("chart") chart: ChartComponent | undefined;

  chartOptions: Partial<ColumnChartOptions>;

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

  private filterDescriptions: ReportFactoryFilterDescription[] = [];
  private readonly filterChangedSubject = new Subject<{ first: ReportFilter, second: ReportFilter }>();
  private readonly unsub = new Unsub();

  constructor(private readonly reportController: ReportController) {
    this.chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: "bar",
        height: window.innerHeight * 0.50
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          }
        }
      }
    };
  }

  ngOnInit() {
    this.unsub.sub = this.filterChangedSubject.asObservable().subscribe(x => console.log(x));

    this.unsub.sub = this.reportController.loadProductionFilterDescription().subscribe(
      filterDescriptions => this.initFilterDescription(filterDescriptions)
    );
  }

  ngOnDestroy() {
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
    this.emitFilterIfNeeded();
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
    this.emitFilterIfNeeded();
  }

  private initFilterDescription(filterDescriptions: ReportFactoryFilterDescription[]): void {
    this.filterDescriptions = filterDescriptions;
    this.factoriesToShow = filterDescriptions.map(x => x.filterElement);
  }

  private emitFilterIfNeeded(): void {

    if (!this.firstFactoryId || !this.firstDepartmentId || !this.firstTeamId) {
      return;
    }

    if (!this.secondFactoryId || !this.secondDepartmentId || !this.secondTeamId) {
      return;
    }

    if (this.firstTeamId && this.secondTeamId) {
      this.filterChangedSubject.next({
        first: {
          factoryId: this.firstFactoryId,
          departmentId: this.firstDepartmentId,
          teamId: this.firstTeamId,
        },
        second: {
          factoryId: this.secondFactoryId,
          departmentId: this.secondDepartmentId,
          teamId: this.secondTeamId,
        }
      })
    }
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

}
