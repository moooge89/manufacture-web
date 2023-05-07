import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
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

  // todo orken
  // done
  makeBudgetRequest(request: BudgetRequest): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.postBody('', request);
  }

  loadBudgetRequests(): Observable<LoadBudgetRequest[]> {
    return this.http.get('');
  }

  loadBudgetRequestsAsResponsible(): Observable<LoadBudgetRequest[]> {
    return this.http.get('/as-responsible');
  }

  // todo orken
  // done
  acceptBudgetRequest(id: number): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.post('/' + id + '/accept', {id});
  }

  // todo orken
  // done
  declineBudgetRequest(id: number): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.post('/' + id + '/decline', {id});
  }

}
