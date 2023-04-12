import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {Company} from "@model/company/Company";

@Injectable({providedIn: 'root'})
export class CompanyController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/company');
  }

  loadCompany(): Observable<Company> {
    return this.http.get('/info');
  }

}
