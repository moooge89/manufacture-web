import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {ReportDescription} from "@model/report/ReportDescription";
import {ReportFilter} from "@model/report/ReportFilter";

@Injectable({providedIn: 'root'})
export class ReportController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/report');
  }

  // todo orken
  loadReportDescription(reportFilter: ReportFilter): Observable<ReportDescription> {
    const reportDescription = new ReportDescription({
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
      firstCountLabel: 'Manufactured parts (first)',
      firstCountScale: [12, 12, 12, 44, 55, 57, 56, 61, 58, 63, 60, 66],
      secondCountLabel: 'Manufactured parts (second)',
      secondCountScale: [12, 12, 12, 76, 85, 101, 98, 87, 105, 91, 114, 94],
      firstCoefLabel: 'Manufacture coefficient (first)',
      firstCoefScale: [12, 12, 12, 35, 41, 36, 26, 45, 48, 52, 53, 41],
      secondCoefLabel: 'Manufacture coefficient (second)',
      secondCoefScale: [12, 12, 12, 35, 41, 36, 26, 45, 48, 52, 53, 41],
    });

    if (1 == 1) {
      return of(reportDescription);
    }

    return this.http.get('', {reportFilter});
  }

}
