import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {SecuredLoginRequest} from "@model/auth/SecuredLoginRequest";
import {map} from "rxjs/operators";
import {BooleanWrapper} from "@model/wrapper/BooleanWrapper";

@Injectable({providedIn: 'root'})
export class AuthController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/auth');
  }

  login(loginRequest: SecuredLoginRequest): Observable<string> {
    return this.http.postBody<any>('/login', loginRequest).pipe(map(x => x.value.id));
  }

  isValidToken(): Observable<boolean> {
    return this.http.post<BooleanWrapper>('/validateToken').pipe(map(x => x.value));
  }

  logout(): Observable<void> {
    return this.http.post('/logout');
  }

}
