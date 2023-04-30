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

  // тут вообще у нас 2 эндпоинта
  // Один для просмотра как заявитель свои рекуесты
  // Другой как ответственное лицо рекуесты других
  //done
  loadBudgetRequests(): Observable<LoadBudgetRequest[]> {

    const requests: LoadBudgetRequest[] = [
      {
        id: 1,
        user: 'Yerassyl',
        amount: 10_000,
        department: 'Some department 1',
        reason: 'I need some money',
      },

      {
        id: 2,
        user: 'Dauir',
        amount: 15_000,
        department: 'Some department 2',
        reason: 'I need some money',
      },

      {
        id: 3,
        user: 'Orken',
        amount: 13_000,
        department: 'Some department 3',
        reason: 'I need some money',
      },

    ];

    if (1 == 1) {
      return of(requests);
    }

    return this.http.post('');
  }

  // вот второй
  loadBudgetRequestsAsResponsible(): Observable<LoadBudgetRequest[]> {

    const requests: LoadBudgetRequest[] = [
      {
        id: 1,
        user: 'Yerassyl',
        amount: 10_000,
        department: 'Some department 1',
        reason: 'I need some money',
      },

    ];

    if (1 == 1) {
      return of(requests);
    }

    return this.http.post('/as-responsible');
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
