import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {SecuredLoginRequest} from "@model/auth/SecuredLoginRequest";
import {map} from "rxjs/operators";
import {BooleanWrapper} from "@model/wrapper/BooleanWrapper";
import {Token} from "@model/auth/Token";

@Injectable({providedIn: 'root'})
export class AuthController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/auth');
  }

  login(loginRequest: SecuredLoginRequest): Observable<string> {
    return this.http.postBody<Token>('/login', loginRequest).pipe(map(token => token.id));
  }

  isValidToken(): Observable<boolean> {
    return this.http.post<BooleanWrapper>('/validateToken').pipe(map(x => x.value));
  }

  logout(): Observable<void> {
    return this.http.post('/logout');
  }

}
