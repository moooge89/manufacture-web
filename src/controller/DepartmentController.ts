import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";

@Injectable({providedIn: 'root'})
export class DepartmentController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/department');
  }

  changePersonDepartment(personId: string, departmentId: string): Observable<void> {
    return of(undefined);
  }

}
