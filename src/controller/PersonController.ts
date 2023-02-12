import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {PersonFilter} from "@model/filter/PersonFilter";
import {Person} from "@model/person/Person";

@Injectable({providedIn: 'root'})
export class PersonController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/person');
  }

  createPerson(person: Person): Observable<Person> {
    person.id = '2';
    return of(person);
  }

  updatePerson(person: Person): Observable<Person> {
    return of(person);
  }

  updatePersonIndex(personId: string, index: number): Observable<void> {
    return of(undefined);
  }

  loadPersons(personFilter: PersonFilter): Observable<Person[]> {
    const persons = [
      new Person({
        id: '1',
        name: 'User 1',
        factoryId: '1',
        factoryName: 'Factory 1',
        departmentId: '1',
        departmentName: 'Department 1',
        index: 1,
      }),

      new Person({
        id: '2',
        name: 'User 2',
        factoryId: '1',
        factoryName: 'Factory 1',
        departmentId: '2',
        departmentName: 'Department 2',
        index: 2,
      }),

      new Person({
        id: '3',
        name: 'User 3',
        factoryId: '2',
        factoryName: 'Factory 2',
        departmentId: '1',
        departmentName: 'Department 1',
        index: 3,
      }),

      new Person({
        id: '4',
        name: 'User 4',
        factoryId: '2',
        factoryName: 'Factory 2',
        departmentId: '2',
        departmentName: 'Department 2',
        index: 4,
      }),
    ];

    return of(persons);
  }

  deletePersons(ids: Set<string>): Observable<void> {
    return of(undefined);
  }

}
