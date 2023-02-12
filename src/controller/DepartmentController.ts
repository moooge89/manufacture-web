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
    const departments: FilterElement[] = [
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
    ];

    return of(departments);
  }

  loadDepartments(): Observable<Department[]> {
    const departments: Department[] = [
      {
        id: '1',
        name: 'Department 1',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      },

      {
        id: '2',
        name: 'Department 2',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      },

      {
        id: '3',
        name: 'Department 3',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      },

      {
        id: '4',
        name: 'Department 4',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      },

      {
        id: '5',
        name: 'Department 5',
        teamCount: 1,
        workerCount: 3,
        persons: [],
      },
    ];

    return of(departments);
  }

  loadDepartmentsAsFilterElements(): Observable<FilterElement[]> {
    return this.loadDepartments().pipe(
      map(departments => departments.map(department => {
        return {
          id: department.id,
          name: department.name
        } as FilterElement
      })),
    );
  }

  changePersonDepartment(personId: string, departmentId: string): Observable<void> {
    return of(undefined);
  }

}
