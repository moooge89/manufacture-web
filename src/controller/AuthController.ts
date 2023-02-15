import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {SecuredLoginRequest} from "@model/auth/SecuredLoginRequest";
import {of} from "rxjs";
import {UserInfo} from "@model/auth/UserInfo";
import {UserRole} from "@model/auth/UserRole";
import {map} from "rxjs/operators";
import {StringWrapper} from "@service/wrapper/StringWrapper";

@Injectable({providedIn: 'root'})
export class AuthController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/auth');
  }

  login(loginRequest: SecuredLoginRequest): Observable<string> {
    if (1 == 1) {
      return of('123');
    }

    return this.http.postBody<StringWrapper>('/login', loginRequest).pipe(map(x => x.value));
  }

  userInfo(): Observable<UserInfo> {
    const userInfo = new UserInfo({
      id: '1',
      role: UserRole.FACTORY_DIRECTOR,
      name: 'Yerassyl'
    });

    return of(userInfo);
  }

  logout(): Observable<void> {
    return of(undefined);
  }

}
