import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {PersonFilter} from "@model/filter/PersonFilter";
import {Person} from "@model/person/Person";

// todo era remove all index related things
@Injectable({providedIn: 'root'})
export class PersonController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/user-api/external/person');
  }

  createPerson(person: Person): Observable<Person> {
    if (1 == 1) {
      person.id = 2;
      return of(person);
    }

    return this.http.postBody('', person);
  }

  updatePerson(person: Person): Observable<Person> {
    if (1 == 1) {
      person.departmentId = 0;
      person.departmentName = 'Default department';
      return of(person);
    }

    return this.http.putBody('/' + person.id, person);
  }

  updatePersonIndex(personId: number, index: number): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.put('/' + personId, {index});
  }

  loadPersons(personFilter: PersonFilter): Observable<Person[]> {
    return this.http.postBody('/list', {...personFilter});
  }

  deletePersons(ids: Set<string>): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.delete('', {ids});
  }

}
