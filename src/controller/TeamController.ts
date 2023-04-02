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
    const teams = [
      {id: '1', displayValue: 'First team'},

      {id: '2', displayValue: 'Second team'},

      {id: '3', displayValue: 'Third team'},
    ];

    if (1 == 1) {
      return of(teams);
    }

    return this.http.get('/list/' + departmentId);
  }

}
