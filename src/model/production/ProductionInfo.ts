export interface ProductionInfo {
  factoryId: string;
  departmentId: string;
  teamId: string;
  titleToShow: string;
  currentPercentage: number;
  millisecondsToOneIteration: number;

  workersCount: number;
  todayManufactured: number;
  yesterdayManufactured: number;
  lastWeekManufactured: number;
  lastMonthManufactured: number;
}
