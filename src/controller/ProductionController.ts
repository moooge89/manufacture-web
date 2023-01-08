import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {ProductionInfo} from "@model/api/production/ProductionInfo";
import {ProductionFilter} from "@model/api/production/ProductionFilter";

@Injectable({providedIn: 'root'})
export class ProductionController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/production');
  }

  loadProductionInfo(productionFilter: ProductionFilter): Observable<ProductionInfo[]> {
    const productionInfo: ProductionInfo[] = [
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 0,
        millisecondsToOneIteration: 5000,
        titleToShow: 'First team',
        workersCount: 3,
        todayManufactured: 1,
        yesterdayManufactured: 2,
        lastWeekManufactured: 3,
        lastMonthManufactured: 4,
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 40,
        millisecondsToOneIteration: 7000,
        titleToShow: 'Second team',
        workersCount: 4,
        todayManufactured: 2,
        yesterdayManufactured: 3,
        lastWeekManufactured: 5,
        lastMonthManufactured: 7,
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 70,
        millisecondsToOneIteration: 3000,
        titleToShow: 'Third team',
        workersCount: 3,
        todayManufactured: 1,
        yesterdayManufactured: 2,
        lastWeekManufactured: 3,
        lastMonthManufactured: 4,
      },
    ];
    return of(productionInfo);
  }

}
