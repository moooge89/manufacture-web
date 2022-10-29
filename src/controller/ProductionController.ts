import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {TeamProductionInfo} from "@model/api/production/TeamProductionInfo";
import {TeamProductionFilter} from "@model/api/production/TeamProductionFilter";
import {ProductionFactoryFilterDescription} from "@model/api/production/ProductionFactoryFilterDescription";

@Injectable({providedIn: 'root'})
export class ProductionController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/production');
  }

  loadTeamProductionInfo(productionFilter: TeamProductionFilter): Observable<TeamProductionInfo[]> {
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
    ];
    return of(productionInfo);
  }

  loadTeamProductionFilterDescription(): Observable<ProductionFactoryFilterDescription[]> {
    const filterDescription: ProductionFactoryFilterDescription[] = [
      {
        filterElement: {
          id: '1',
          name: 'First factory',
        },
        departments: [
          {
            id: '1',
            name: 'First department',
          },

          {
            id: '2',
            name: 'Second department',
          },

          {
            id: '3',
            name: 'Third department',
          },
        ],
      },
      {
        filterElement: {
          id: '2',
          name: 'Second factory',
        },
        departments: [
          {
            id: '4',
            name: 'Fourth department',
          },

          {
            id: '5',
            name: 'Fifth department',
          },

          {
            id: '6',
            name: 'Sixth department',
          },
        ],
      }
    ];

    return of(filterDescription);
  }

}
