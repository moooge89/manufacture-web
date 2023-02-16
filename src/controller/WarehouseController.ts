import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {WarehouseMaterial} from "@model/material/WarehouseMaterial";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {ElementGroup} from "@model/manufacture/ElementGroup";

@Injectable({providedIn: 'root'})
export class WarehouseController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/warehouse');
  }

  loadWarehouseMaterials(materialFilter: MaterialFilter): Observable<WarehouseMaterial[]> {
    const materials = [
      new WarehouseMaterial({
        id: '1',
        icon: 'sand',
        name: 'Sand',
        available: 1000.2,
        usedIn: 'window, and in other staffs'
      }),
    ];

    if (1 == 1) {
      return of(materials);
    }

    return this.http.get('/warehouse-material', {materialFilter});
  }

  loadWarehouseStoredInfo(manufactureType: string): Observable<ElementGroup[]> {
    const manufactureElements = [
      new ElementGroup({
        label: 'All',
        count: 102,
      }),

      new ElementGroup({
        label: 'Department 1',
        count: 44,
      }),

      new ElementGroup({
        label: 'Department 2',
        count: 55,
      }),
    ];

    if (1 == 1) {
      return of(manufactureElements);
    }

    return this.http.get('/stored-info', {manufactureType});
  }

}
