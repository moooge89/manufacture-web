import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {MaterialFilterDescription} from "@model/filter/MaterialFilterDescription";
import {StaticFilterData} from "@model/filter/StaticFilterData";
import {FactoryFilterDescription} from "@model/api/production/FactoryFilterDescription";

@Injectable({providedIn: 'root'})
// todo era decompose
export class FilterController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/filter');
  }

  loadFilterDescription(): Observable<MaterialFilterDescription> {
    const filterDescription: MaterialFilterDescription = {
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
      countries: [
        {
          id: '1',
          name: 'Kazakhstan',
        },

        {
          id: '2',
          name: 'USA',
        },

        {
          id: '3',
          name: 'Russia',
        },
      ],
    };

    return of(filterDescription);
  }

  loadStaticFilterData(): Observable<StaticFilterData> {
    const filterData: StaticFilterData = {
      countries: ['Kazakhstan', 'USA', 'Russia'],
      icons: ['aluminum', 'bronze', 'gold', 'iron', 'steel', 'sand'],
    };

    return of(filterData);
  }

  loadFactoryFilterDescription(): Observable<FactoryFilterDescription[]> {
    const filterDescription: FactoryFilterDescription[] = [
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
