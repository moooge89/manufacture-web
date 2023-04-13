import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {WarehouseMaterial} from "@model/material/WarehouseMaterial";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {ElementGroup} from "@model/manufacture/ElementGroup";

@Injectable({providedIn: 'root'})
export class WarehouseController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/warehouse');
  }

  loadWarehouseMaterials(materialFilter: MaterialFilter): Observable<WarehouseMaterial[]> {
    return this.http.postBody('/warehouse-materials', materialFilter);
  }

  loadWarehouseStoredInfo(partType: number): Observable<ElementGroup[]> {
    return this.http.post('/stored-info', {partType});
  }

}
