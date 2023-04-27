import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {FactoryInfo} from "@model/factory/FactoryInfo";
import {LightFactoryInfo} from "@model/factory/LightFactoryInfo";
import {FilterElement} from "@model/filter/FilterElement";

@Injectable({providedIn: 'root'})
export class FactoryController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/factory');
  }

  loadFactories(): Observable<LightFactoryInfo[]> {
    return this.http.get('/light-factory');
  }

  loadFactoriesAsFilterElements(): Observable<FilterElement[]> {
    return this.http.get('/filter-elements');
  }

  loadFactoryInfo(): Observable<FactoryInfo> {
    return this.http.get('/info');
  }

  loadFactoryInfoById(factoryId: number): Observable<FactoryInfo> {
    return this.http.get('/info/' + factoryId);
  }

}
