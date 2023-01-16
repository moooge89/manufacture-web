import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {SecuredLoginRequest} from "@model/auth/SecuredLoginRequest";
import {of} from "rxjs";
import {UserInfo} from "@model/auth/UserInfo";
import {UserRole} from "@model/auth/UserRole";

@Injectable({providedIn: 'root'})
export class AuthController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/auth');
  }

  login(loginInfo: SecuredLoginRequest): Observable<string> {
    if (1 == 1) {
      return of('123');
    }

    return this.http.postBodyString('/login', loginInfo);
  }

  userInfo(): Observable<UserInfo> {
    const userInfo: UserInfo = {
      id: '1',
      role: UserRole.FACTORY_DIRECTOR,
      name: 'Yerassyl'
    };

    return of(userInfo);
  }

  logout(): Observable<void> {
    return of(undefined);
  }

}
