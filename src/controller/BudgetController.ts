import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {BudgetRequest} from "@model/budget/BudgetRequest";

@Injectable({providedIn: 'root'})
export class BudgetController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/budget');
  }

  loadAvailableBudget(): Observable<number> {
    return of(1000);
  }

  makeBudgetRequest(request: BudgetRequest): Observable<void> {
    console.log(request);
    return of(undefined);
  }

}
