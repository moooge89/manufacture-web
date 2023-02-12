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
    this.http = http.setControllerPrefix('/department');
  }

  loadDepartmentsOfFactoryAsFilterElements(factoryId: string): Observable<FilterElement[]> {
    const departments = [
      new FilterElement({
        id: '1',
        name: 'First department',
      }),

      new FilterElement({
        id: '2',
        name: 'Second department',
      }),

      new FilterElement({
        id: '3',
        name: 'Third department',
      }),
    ];

    return of(departments);
  }

  loadDepartments(): Observable<Department[]> {
    const departments = [
      new Department({
        id: '1',
        name: 'Department 1',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      }),

      new Department({
        id: '2',
        name: 'Department 2',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      }),

      new Department({
        id: '3',
        name: 'Department 3',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      }),

      new Department({
        id: '4',
        name: 'Department 4',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      }),

      new Department({
        id: '5',
        name: 'Department 5',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      }),
    ];

    return of(departments);
  }

  loadDepartmentsAsFilterElements(): Observable<FilterElement[]> {
    return this.loadDepartments().pipe(
      map(departments => departments.map(department => {
        return new FilterElement({
          id: department.id,
          name: department.name
        })
      })),
    );
  }

  changePersonDepartment(personId: string, departmentId: string): Observable<void> {
    return of(undefined);
  }

}
