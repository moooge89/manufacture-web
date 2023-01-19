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
    const countries: FilterElement[] = [
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
    ];

    return of(countries);
  }

  loadIconFilterElements(): Observable<FilterElement[]> {
    const icons: FilterElement[] = [
      {
        id: '1',
        name: 'aluminum',
      },

      {
        id: '2',
        name: 'bronze',
      },

      {
        id: '3',
        name: 'gold',
      },

      {
        id: '4',
        name: 'iron',
      },

      {
        id: '5',
        name: 'steel',
      },

      {
        id: '6',
        name: 'sand',
      },

    ];

    return of(icons);
  }

}
