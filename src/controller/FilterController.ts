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
      new FilterElement({
        id: '1',
        name: 'Kazakhstan',
      }),

      new FilterElement({
        id: '2',
        name: 'USA',
      }),

      new FilterElement({
        id: '3',
        name: 'Russia',
      }),
    ];

    return of(countries);
  }

  loadIconFilterElements(): Observable<FilterElement[]> {
    const icons = [
      new FilterElement({
        id: '1',
        name: 'aluminum',
      }),

      new FilterElement({
        id: '2',
        name: 'bronze',
      }),

      new FilterElement({
        id: '3',
        name: 'gold',
      }),

      new FilterElement({
        id: '4',
        name: 'iron',
      }),

      new FilterElement({
        id: '5',
        name: 'steel',
      }),

      new FilterElement({
        id: '6',
        name: 'sand',
      }),

    ];

    return of(icons);
  }

}
