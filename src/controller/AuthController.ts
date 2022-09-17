import {Injectable} from '@angular/core';
import {HttpService} from "../service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {LoginInfo} from "../model/auth/LoginInfo";
import {of} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('');
  }

  login(loginInfo: LoginInfo): Observable<string> {
    // return this.http.postBodyString('/login', loginInfo);
    return of('token');
  }

}
