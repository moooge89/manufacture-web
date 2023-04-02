import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {FilterElement} from "@model/filter/FilterElement";

@Injectable({providedIn: 'root'})
export class EnumController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/enum');
  }

  loadCountryFilterElements(): Observable<FilterElement[]> {
    return this.http.get('/countries');
  }

  loadIconFilterElements(): Observable<FilterElement[]> {
    return this.http.get('/icons');
  }

}
