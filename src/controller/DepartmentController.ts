import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {FilterElement} from "@model/filter/FilterElement";
import {map} from "rxjs/operators";
import {Department} from "@model/department/Department";

@Injectable({providedIn: 'root'})
export class DepartmentController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/department');
  }

  // todo orken integrate
  loadDepartmentsOfFactoryAsFilterElements(factoryId: string): Observable<FilterElement[]> {
    const departments = [
      {id: '1', displayValue: 'First department'},

      {id: '2', displayValue: 'Second department'},

      {id: '3', displayValue: 'Third department'},
    ];

    if (1 == 1) {
      return of(departments);
    }

    return this.http.get('/factory-filter-element', {factoryId});
  }

  loadDepartments(): Observable<Department[]> {
    return this.http.get('');
  }

  // todo orken integrate
  loadDepartmentsAsFilterElements(): Observable<FilterElement[]> {
    if (1 == 1) {
      return this.loadDepartments().pipe(
        map(departments => departments.map(department => {
          return {id: department.id, displayValue: department.name};
        })),
      );
    }

    return this.http.get('/filter-element');
  }

  changePersonDepartment(personId: string, departmentId: string): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.patch('/change-person-department/' + personId, {departmentId});
  }

}
