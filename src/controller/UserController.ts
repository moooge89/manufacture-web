import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {UserInfo} from "@model/auth/UserInfo";

@Injectable({providedIn: 'root'})
export class UserController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/user-api/external');
  }

  userInfo(): Observable<UserInfo> {
    return this.http.get('/username');
  }

  changePersonDepartment(personId: number, depId: number): Observable<void> {
    return this.http.post('/person/change-department/' + personId, {depId});
  }

}
