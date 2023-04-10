import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {BudgetRequest} from "@model/budget/BudgetRequest";
import {map} from "rxjs/operators";
import {NumberWrapper} from "@model/wrapper/NumberWrapper";

@Injectable({providedIn: 'root'})
export class BudgetController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/budget');
  }

  // todo orken integrate
  //done
  loadAvailableBudget(): Observable<number> {
    // if (1 == 1) {
    //   return of(1000);
    // }

    return this.http.get<NumberWrapper>('/company').pipe(map(x => x.value));
  }

  makeBudgetRequest(request: BudgetRequest): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.postBody('', request);
  }

}
