import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {Company} from "@model/company/Company";

@Injectable({providedIn: 'root'})
export class CompanyController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/company');
  }

  loadCompany(): Observable<Company> {
    const company = new Company({
      name: 'Kazakhstan Transport Company',
      directorName: 'Yeletay Yerassyl',
      workerCount: 123,
      factoryCount: 3,
    });

    if (1 == 1) {
      return of(company);
    }

    return this.http.get('');
  }

}
