import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {SecuredLoginRequest} from "@model/auth/SecuredLoginRequest";
import {map} from "rxjs/operators";
import {StringWrapper} from "@service/../model/wrapper/StringWrapper";
import {BooleanWrapper} from "@model/wrapper/BooleanWrapper";

@Injectable({providedIn: 'root'})
export class AuthController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/auth');
  }

  login(loginRequest: SecuredLoginRequest): Observable<string> {
    return this.http.postBody<StringWrapper>('/login', loginRequest).pipe(map(x => x.value));
  }

  isValidToken(): Observable<boolean> {
    return this.http.post<BooleanWrapper>('/validateToken').pipe(map(x => x.value));
  }

  logout(): Observable<void> {
    return this.http.post('/logout');
  }

}
