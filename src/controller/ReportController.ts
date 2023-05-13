import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {ReportDescription} from "@model/report/ReportDescription";
import {ReportFilter} from "@model/report/ReportFilter";
import {AnalyticsFilter} from "@model/analytics/AnalyticsFilter";
import {AnalyticsDescription} from "@model/analytics/AnalyticsDescription";

@Injectable({providedIn: 'root'})
export class ReportController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/report');
  }

  loadReportDescription(reportFilter: ReportFilter): Observable<ReportDescription> {
    return this.http.postBody('', reportFilter);
  }

  loadAnalyticsDescription(analyticsFilter: AnalyticsFilter): Observable<AnalyticsDescription> {
    return this.http.postBody('/analytics', analyticsFilter);
  }

}
