import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {FilterElement} from "@model/filter/FilterElement";
import {Department} from "@model/department/Department";

@Injectable({providedIn: 'root'})
export class DepartmentController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/department');
  }

  loadDepartmentsOfFactoryAsFilterElements(factoryId: number): Observable<FilterElement[]> {
    return this.http.get('/filter-elements/by-factory/' + factoryId);
  }

  loadDepartments(): Observable<Department[]> {
    return this.http.get('');
  }

  loadDepartmentsAsFilterElements(): Observable<FilterElement[]> {
    return this.http.get('/filter-elements');
  }

  changePersonDepartment(personId: number, departmentId: number): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.patch('/change-person-department/' + personId, {departmentId});
  }

}
