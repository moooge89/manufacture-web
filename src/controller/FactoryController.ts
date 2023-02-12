import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {FactoryInfo} from "@model/factory/FactoryInfo";
import {LightFactoryInfo} from "@model/factory/LightFactoryInfo";
import {FilterElement} from "@model/filter/FilterElement";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class FactoryController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/factory');
  }

  loadFactories(): Observable<LightFactoryInfo[]> {
    const factories = [
      new LightFactoryInfo({
        id: '1',
        name: 'Almaty Car Factory',
        directorName: 'Yeletay Yerassyl',
        workerCount: 50
      }),
      new LightFactoryInfo({
        id: '2',
        name: 'Semey Car Factory',
        directorName: 'Yeletay Yerassyl',
        workerCount: 30
      }),
      new LightFactoryInfo({
        id: '3',
        name: 'Shymkent Car Factory',
        directorName: 'Yeletay Yerassyl',
        workerCount: 60
      }),
    ];

    return of(factories);
  }

  loadFactoriesAsFilterElements(): Observable<FilterElement[]> {
    return this.loadFactories().pipe(
      map(factories => factories.map(factory => {
        return new FilterElement({
          id: factory.id,
          name: factory.name
        })
      })),
    );
  }

  loadFactoryInfo(): Observable<FactoryInfo> {
    const factoryInfo = new FactoryInfo({
      id: '1',
      name: 'Almaty Car Factory',
      directorName: 'Yeletay Yerassyl',
      workerCount: 50,
      geoPoint: {
        latitude: 43.26501881519278,
        longitude: 76.97141432814534,
      },
      departmentCount: 3,
      year: 2022,
    });
    return of(factoryInfo);
  }

  loadFactoryInfoById(factoryId: string): Observable<FactoryInfo> {
    const factoryInfo = new FactoryInfo({
      id: '1',
      name: 'Almaty Car Factory',
      directorName: 'Yeletay Yerassyl',
      workerCount: 50,
      geoPoint: {
        latitude: 43.26501881519278,
        longitude: 76.97141432814534,
      },
      departmentCount: 3,
      year: 2022,
    });
    return of(factoryInfo);
  }

  makeUserDirector(userId: string): Observable<void> {
    return of(undefined);
  }

}
