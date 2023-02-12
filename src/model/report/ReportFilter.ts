export class ReportFilter {

  firstFactoryId: string = '';
  secondFactoryId: string = '';

  firstDepartmentId: string = '';
  secondDepartmentId: string = '';

  firstTeamId: string = '';
  secondTeamId: string = '';

  clearFirstDepartment(): void {
    this.firstDepartmentId = '';
  }

  clearFirstTeam(): void {
    this.firstTeamId = '';
  }

  clearSecondDepartment(): void {
    this.secondDepartmentId = '';
  }

  clearSecondTeam(): void {
    this.secondTeamId = '';
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
