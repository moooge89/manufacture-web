import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {MaterialFilterDescription} from "@model/filter/MaterialFilterDescription";

@Injectable({providedIn: 'root'})
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

  // todo era make one request from them
  loadCountries(): Observable<string[]> {
    const countries: string[] = ['Kazakhstan', 'USA', 'Russia'];
    return of(countries);
  }

  // todo era make one request from them
  loadIcons(): Observable<string[]> {
    const icons: string[] = ['aluminum', 'bronze', 'gold', 'iron', 'steel', 'sand'];
    return of(icons);
  }

}
