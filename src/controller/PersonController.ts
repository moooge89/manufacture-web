import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {PersonFilter} from "@model/filter/PersonFilter";
import {Person} from "@model/person/Person";
import {DeletePersonWrapper} from "@model/person/DeletePersonWrapper";

@Injectable({providedIn: 'root'})
export class PersonController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/user-api/external/person');
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.postBody('', person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.putBody('/' + person.id, person);
  }

  loadPersons(personFilter: PersonFilter): Observable<Person[]> {
    return this.http.postBody('/list', {...personFilter});
  }

  deletePersons(deletePersonWrapper: DeletePersonWrapper): Observable<void> {
    return this.http.postBody('/delete', {deletePersonWrapper});
  }

}
