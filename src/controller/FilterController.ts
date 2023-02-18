import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {FilterElement} from "@model/filter/FilterElement";

@Injectable({providedIn: 'root'})
export class FilterController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/filter');
  }

  loadCountryFilterElements(): Observable<FilterElement[]> {
    const countries = [
      new FilterElement('1', 'Kazakhstan'),

      new FilterElement('2', 'USA'),

      new FilterElement('3', 'Russia'),
    ];

    if (1 == 1) {
      return of(countries);
    }

    return this.http.get('/country');
  }

  loadIconFilterElements(): Observable<FilterElement[]> {
    const icons = [
      new FilterElement('1', 'aluminum'),

      new FilterElement('2', 'bronze'),

      new FilterElement('3', 'gold'),

      new FilterElement('4', 'iron'),

      new FilterElement('5', 'steel'),

      new FilterElement('6', 'sand'),
    ];

    if (1 == 1) {
      return of(icons);
    }

    return this.http.get('/icon');
  }

}
