export class ProductionInfo {
  factoryId: string = '';
  departmentId: string = '';
  teamId: string = '';
  titleToShow: string = '';
  currentPercentage: number = 0;
  millisecondsToOneIteration: number = 0;

  workersCount: number = 0;
  todayManufactured: number = 0;
  yesterdayManufactured: number = 0;
  lastWeekManufactured: number = 0;
  lastMonthManufactured: number = 0;

  constructor(init?: Partial<ProductionInfo>) {
    Object.assign(this, init);
  }

  startTime(): number {
    return this.currentPercentage * this.millisecondsToOneIteration / 100;
  }

  playbackRate(): number {
    return 1000 / this.millisecondsToOneIteration;
  }

  increaseTodayManufactured(): void {
    this.todayManufactured++;
  }

}
