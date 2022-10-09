import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {WarehouseMaterial} from "@model/api/material/WarehouseMaterial";

@Injectable({providedIn: 'root'})
export class WarehouseController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/warehouse');
  }

  loadWarehouseMaterials(): Observable<WarehouseMaterial[]> {
    const materials: WarehouseMaterial[] = [
      {
        icon: 'sand',
        name: 'Sand',
        available: 1000.2,
        usedIn: 'window, and in other staffs'
      },
    ];

    return of(materials);
  }

}
