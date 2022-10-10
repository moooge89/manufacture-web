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
          name: 'First country',
        },

        {
          id: '2',
          name: 'Second country',
        },

        {
          id: '3',
          name: 'Third country',
        },
      ],
    };

    return of(filterDescription);
  }

}
