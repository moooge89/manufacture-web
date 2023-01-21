import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {FilterElement} from "@model/filter/FilterElement";

@Injectable({providedIn: 'root'})
export class TeamController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/team');
  }

  loadTeamsOfDepartmentAsFilterElements(departmentId: string): Observable<FilterElement[]> {
    const teams: FilterElement[] = [
      {
        id: '1',
        name: 'First team',
      },

      {
        id: '2',
        name: 'Second team',
      },

      {
        id: '3',
        name: 'Third team',
      },
    ];

    return of(teams);
  }

}