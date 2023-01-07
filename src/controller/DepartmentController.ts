import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {Department} from "@model/api/Department";

@Injectable({providedIn: 'root'})
export class DepartmentController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/department');
  }

  loadDepartments(): Observable<Department[]> {
    const departments: Department[] = [
      {
        id: '1',
        name: 'Department 1',
        persons: [
          {
            id: '1',
            name: 'Person 11',
            departmentId: '1',
          },
          {
            id: '2',
            name: 'Person 12',
            departmentId: '1',
          },
          {
            id: '3',
            name: 'Person 13',
            departmentId: '1',
          },
        ],
        teamCount: 1,
        workerCount: 3,
      },

      {
        id: '2',
        name: 'Department 2',
        persons: [
          {
            id: '4',
            name: 'Person 21',
            departmentId: '2',
          },
          {
            id: '5',
            name: 'Person 22',
            departmentId: '2',
          },
          {
            id: '6',
            name: 'Person 23',
            departmentId: '2',
          },
        ],
        teamCount: 1,
        workerCount: 3,
      },

      {
        id: '3',
        name: 'Department 3',
        persons: [
          {
            id: '7',
            name: 'Person 31',
            departmentId: '3',
          },
          {
            id: '8',
            name: 'Person 32',
            departmentId: '3',
          },
          {
            id: '9',
            name: 'Person 33',
            departmentId: '3',
          },
        ],
        teamCount: 1,
        workerCount: 3,
      },

      {
        id: '4',
        name: 'Department 4',
        persons: [
          {
            id: '10',
            name: 'Person 41',
            departmentId: '4',
          },
          {
            id: '11',
            name: 'Person 42',
            departmentId: '4',
          },
          {
            id: '12',
            name: 'Person 43',
            departmentId: '4',
          },
        ],
        teamCount: 1,
        workerCount: 3,
      },

      {
        id: '5',
        name: 'Department 5',
        persons: [
          {
            id: '13',
            name: 'Person 51',
            departmentId: '5',
          },
          {
            id: '14',
            name: 'Person 52',
            departmentId: '5',
          },
          {
            id: '15',
            name: 'Person 53',
            departmentId: '5',
          },
        ],
        teamCount: 1,
        workerCount: 3,
      },
    ];

    return of(departments);
  }

  changePersonDepartment(personId: string, departmentId: string): Observable<void> {
    return of(undefined);
  }

}
