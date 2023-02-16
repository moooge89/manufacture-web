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
    if (1 == 1) {
      person.id = '2';
      return of(person);
    }

    return this.http.postBody('', person);
  }

  updatePerson(person: Person): Observable<Person> {
    if (1 == 1) {
      person.departmentId = '0';
      person.departmentName = 'Default department';
      return of(person);
    }

    return this.http.putBody('/' + person.id, person);
  }

  updatePersonIndex(personId: string, index: number): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.put('/' + personId, {index});
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

    if (1 == 1) {
      return of(persons);
    }

    return this.http.get('/list', {personFilter});
  }

  deletePersons(ids: Set<string>): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.delete('', {ids});
  }

}
