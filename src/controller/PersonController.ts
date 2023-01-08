import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {PersonFilter} from "@model/person/PersonFilter";
import {Person} from "@model/person/Person";

@Injectable({providedIn: 'root'})
export class PersonController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/person');
  }

  loadPersons(personFilter: PersonFilter): Observable<Person[]> {
    const persons: Person[] = [
      {
        id: '1',
        name: 'User 1',
        factoryId: '1',
        factoryName: 'Factory 1',
        departmentId: '1',
        departmentName: 'Department 1',
      },
      {
        id: '2',
        name: 'User 2',
        factoryId: '1',
        factoryName: 'Factory 1',
        departmentId: '2',
        departmentName: 'Department 2',
      },
      {
        id: '3',
        name: 'User 3',
        factoryId: '2',
        factoryName: 'Factory 2',
        departmentId: '1',
        departmentName: 'Department 1',
      },
      {
        id: '4',
        name: 'User 4',
        factoryId: '2',
        factoryName: 'Factory 2',
        departmentId: '2',
        departmentName: 'Department 2',
      },
    ];

    return of(persons);
  }

}
