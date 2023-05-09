import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {BudgetRequest} from "@model/budget/BudgetRequest";
import {map} from "rxjs/operators";
import {NumberWrapper} from "@model/wrapper/NumberWrapper";
import {LoadBudgetRequest} from "@model/budget/LoadBudgetRequest";

@Injectable({providedIn: 'root'})
export class BudgetController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/budget');
  }

  loadAvailableBudget(): Observable<number> {
    return this.http.get<NumberWrapper>('/company').pipe(map(x => x.value));
  }

  makeBudgetRequest(request: BudgetRequest): Observable<void> {
    return this.http.postBody('', request);
  }

  loadBudgetRequests(): Observable<LoadBudgetRequest[]> {
    return this.http.get('');
  }

  loadBudgetRequestsAsResponsible(): Observable<LoadBudgetRequest[]> {
    return this.http.get('/as-responsible');
  }

  acceptBudgetRequest(id: number): Observable<void> {
    return this.http.put('/' + id + '/approve');
  }

  declineBudgetRequest(id: number): Observable<void> {
    return this.http.put('/' + id + '/decline');
  }

}
