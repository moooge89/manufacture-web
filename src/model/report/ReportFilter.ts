export class ReportFilter {

  firstFactoryId: number = NaN;
  secondFactoryId: number = NaN;

  firstDepartmentId: number = NaN;
  secondDepartmentId: number = NaN;

  firstTeamId: number = NaN;
  secondTeamId: number = NaN;

  clearFirstDepartment(): void {
    this.firstDepartmentId = NaN;
  }

  clearFirstTeam(): void {
    this.firstTeamId = NaN;
  }

  clearSecondDepartment(): void {
    this.secondDepartmentId = NaN;
  }

  clearSecondTeam(): void {
    this.secondTeamId = NaN;
  }

  hasFirstFactory(): boolean {
    return !!this.firstFactoryId;
  }

  hasFirstDepartment(): boolean {
    return !!this.firstDepartmentId;
  }

  hasSecondFactory(): boolean {
    return !!this.secondFactoryId;
  }

  hasSecondDepartment(): boolean {
    return !!this.secondDepartmentId;
  }

}
