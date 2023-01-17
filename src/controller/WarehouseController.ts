import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {WarehouseMaterial} from "@model/api/material/WarehouseMaterial";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {ManufactureElement} from "@model/manufacture/ManufactureElement";

@Injectable({providedIn: 'root'})
export class WarehouseController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/warehouse');
  }

  loadWarehouseMaterials(materialFilter: MaterialFilter): Observable<WarehouseMaterial[]> {
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

  loadWarehouseStoredInfo(manufactureType: string): Observable<ManufactureElement[]> {
    const manufactureElements: ManufactureElement[] = [
      {
        label: 'All',
        manufactured: 102,
      },
      {
        label: 'Department 1',
        manufactured: 44,
      },
      {
        label: 'Department 2',
        manufactured: 55,
      },
    ];

    return of(manufactureElements);
  }

}
