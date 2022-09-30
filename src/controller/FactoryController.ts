import {Injectable} from '@angular/core';
import {HttpService} from "../service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {FactoryInfo} from "../model/api/FactoryInfo";

@Injectable({providedIn: 'root'})
export class FactoryController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/factory');
  }

  loadFactoryInfo(): Observable<FactoryInfo> {
    const factoryInfo: FactoryInfo = {
      name: 'Almaty Car Factory',
      director: 'Yeletay Yerassyl',
      workerCount: 50,
      geoPoint: {
        latitude: 43.26501881519278,
        longitude: 76.97141432814534,
      },
      departmentCount: 3,
      year: 2022,
    };
    return of(factoryInfo);
  }

}
