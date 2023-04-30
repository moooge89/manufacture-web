export class AnalyticsFilter {

  factoryId: number = NaN;

  departmentId: number = NaN;

  teamId: number = NaN;

  clearDepartment(): void {
    this.departmentId = NaN;
  }

  clearTeam(): void {
    this.teamId = NaN;
  }

  hasFactory(): boolean {
    return !!this.factoryId;
  }

  hasDepartment(): boolean {
    return !!this.departmentId;
  }

}
