import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {AnalyticsDescription} from "@model/analytics/AnalyticsDescription";
import {AnalyticsFilter} from "@model/analytics/AnalyticsFilter";

@Injectable({providedIn: 'root'})
export class AnalyticsController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/analytics');
  }

  // todo orken
  loadAnalyticsDescription(analyticsFilter: AnalyticsFilter): Observable<AnalyticsDescription> {
    const analyticsDescription: AnalyticsDescription = {
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
      countLabel: 'Manufactured parts',
      countScale: [12, 12, 12, 44, 55, 57, 56, 61, 58, 63, 60, 66],
    };

    if (1 == 1) {
      return of(analyticsDescription);
    }

    return this.http.get('', {analyticsFilter});
  }

}
