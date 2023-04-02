import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {FactoryInfo} from "@model/factory/FactoryInfo";
import {LightFactoryInfo} from "@model/factory/LightFactoryInfo";
import {FilterElement} from "@model/filter/FilterElement";
import {map} from "rxjs/operators";
import {GeoPoint} from "@model/factory/GeoPoint";

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
    if (1 == 1) {
      return this.loadFactories().pipe(
        map(factories => factories.map(factory => {
          return {id: factory.id, displayValue: factory.name};
        })),
      );
    }

    return this.http.get('/filter-element');
  }

  loadFactoryInfo(): Observable<FactoryInfo> {
    const factoryInfo = new FactoryInfo({
      id: '1',
      name: 'Almaty Car Factory',
      directorName: 'Yeletay Yerassyl',
      workerCount: 50,
      geoPoint: new GeoPoint(76.97141432814534, 43.26501881519278),
      departmentCount: 3,
      year: 2022,
    });

    if (1 == 1) {
      return of(factoryInfo);
    }

    return this.http.get('/info');
  }

  loadFactoryInfoById(factoryId: string): Observable<FactoryInfo> {
    const factoryInfo = new FactoryInfo({
      id: '1',
      name: 'Almaty Car Factory',
      directorName: 'Yeletay Yerassyl',
      workerCount: 50,
      geoPoint: new GeoPoint(76.97141432814534, 43.26501881519278),
      departmentCount: 3,
      year: 2022,
    });

    if (1 == 1) {
      return of(factoryInfo);
    }

    return this.http.get('/info-by-id/' + factoryId);
  }

  makeUserDirector(userId: string): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.patch('/make-director/' + userId);
  }

}
