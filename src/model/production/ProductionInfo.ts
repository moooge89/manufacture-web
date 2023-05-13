export interface ProductionInfo {
  factoryId: number;
  departmentId: number;
  teamId: number;
  titleToShow: string;
  currentPercentage: number;
  millisecondsToOneIteration: number;

  workersCount: number;
  todayManufactured: number;
  yesterdayManufactured: number;
  lastWeekManufactured: number;
  lastMonthManufactured: number;

}
