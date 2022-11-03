import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {ReportFactoryFilterDescription} from "@model/api/report/ReportFactoryFilterDescription";
import {ReportDescription} from "@model/report/ReportDescription";

@Injectable({providedIn: 'root'})
export class ReportController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/report');
  }

  loadReportFilterDescription(): Observable<ReportFactoryFilterDescription[]> {
    const filterDescription: ReportFactoryFilterDescription[] = [
      {
        filterElement: {
          id: '1',
          name: 'First factory',
        },
        departments: [

          {
            filterElement: {
              id: '1',
              name: 'First department',
            },
            teams: [
              {
                id: '1',
                name: 'First team',
              },
              {
                id: '2',
                name: 'Second team',
              },
            ],
          },

          {
            filterElement: {
              id: '2',
              name: 'Second department',
            },
            teams: [
              {
                id: '3',
                name: 'Third team',
              },
              {
                id: '4',
                name: 'Fourth team',
              },
            ],
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
            filterElement: {
              id: '3',
              name: 'Third department',
            },
            teams: [
              {
                id: '5',
                name: 'Fifth team',
              },
              {
                id: '6',
                name: 'Sixth team',
              },
            ],
          },

          {
            filterElement: {
              id: '4',
              name: 'Fourth department',
            },
            teams: [
              {
                id: '7',
                name: 'Seventh team',
              },
              {
                id: '8',
                name: 'Eighth team',
              },
            ],
          },

        ],
      },

    ];

    return of(filterDescription);
  }

  loadReportDescription(): Observable<ReportDescription> {
    const reportDescription = {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      firstCountScale: [12, 12, 12, 44, 55, 57, 56, 61, 58, 63, 60, 66],
      secondCountScale: [12, 12, 12, 76, 85, 101, 98, 87, 105, 91, 114, 94],
      firstCoefScale: [12, 12, 12, 35, 41, 36, 26, 45, 48, 52, 53, 41],
      secondCoefScale: [12, 12, 12, 35, 41, 36, 26, 45, 48, 52, 53, 41],
    };

    return of(reportDescription);
  }

}
