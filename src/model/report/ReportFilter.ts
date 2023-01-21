export class ReportFilter {

  firstFactoryId: string = '';
  secondFactoryId: string = '';

  firstDepartmentId: string = '';
  secondDepartmentId: string = '';

  firstTeamId: string = '';
  secondTeamId: string = '';

  public clearFirstDepartment(): void {
    this.firstDepartmentId = '';
  }

  public clearFirstTeam(): void {
    this.firstTeamId = '';
  }

  public clearSecondDepartment(): void {
    this.secondDepartmentId = '';
  }

  public clearSecondTeam(): void {
    this.secondTeamId = '';
  }

  public hasFirstFactory(): boolean {
    return !!this.firstFactoryId;
  }

  public hasFirstDepartment(): boolean {
    return !!this.firstDepartmentId;
  }

  public hasSecondFactory(): boolean {
    return !!this.secondFactoryId;
  }

  public hasSecondDepartment(): boolean {
    return !!this.secondDepartmentId;
  }

}
