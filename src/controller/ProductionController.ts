import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {TeamProductionInfo} from "@model/api/production/TeamProductionInfo";

@Injectable({providedIn: 'root'})
export class ProductionController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/production');
  }

  loadTeamProductionInfo(): Observable<TeamProductionInfo[]> {
    const productionInfo: TeamProductionInfo[] = [
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 0,
        millisecondsToOneIteration: 5000,
        titleToShow: 'First team',
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 40,
        millisecondsToOneIteration: 7000,
        titleToShow: 'Second team',
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 70,
        millisecondsToOneIteration: 3000,
        titleToShow: 'Third team',
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 0,
        millisecondsToOneIteration: 5000,
        titleToShow: 'First team',
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 40,
        millisecondsToOneIteration: 7000,
        titleToShow: 'Second team',
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 70,
        millisecondsToOneIteration: 3000,
        titleToShow: 'Third team',
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 0,
        millisecondsToOneIteration: 5000,
        titleToShow: 'First team',
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 40,
        millisecondsToOneIteration: 7000,
        titleToShow: 'Second team',
      },
      {
        factoryId: '1',
        departmentId: '1',
        teamId: '1',
        currentPercentage: 70,
        millisecondsToOneIteration: 3000,
        titleToShow: 'Third team',
      },
    ];
    return of(productionInfo);
  }

}
