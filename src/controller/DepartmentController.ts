import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {FilterElement} from "@model/filter/FilterElement";
import {Department} from "@model/department/Department";

@Injectable({providedIn: 'root'})
export class DepartmentController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/department');
  }

  loadDepartmentsOfFactoryAsFilterElements(factoryId: number): Observable<FilterElement[]> {
    return this.http.get('/filter-elements/by-factory/' + factoryId);
  }

  loadDepartments(): Observable<Department[]> {
    return this.http.get('');
  }

  loadDepartmentsAsFilterElements(): Observable<FilterElement[]> {
    return this.http.get('/filter-elements');
  }

}
