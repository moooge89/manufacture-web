import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {Manufacture} from "@model/manufacture/Manufacture";
import {ManufactureFilter} from "@model/filter/ManufactureFilter";
import {FilterElement} from "@model/filter/FilterElement";
import {ElementGroup} from "@model/manufacture/ElementGroup";

@Injectable({providedIn: 'root'})
export class ManufactureController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/manufacture');
  }

  loadManufactureRows(filter: ManufactureFilter): Observable<Manufacture[]> {
    return this.http.postBody('/manufactured-parts', {filter});
  }

  loadManufactureTypesAsFilterElements(): Observable<FilterElement[]> {
    return this.http.get('/parts/filter-elements');
  }

  loadManufactureElements(manufactureType: string): Observable<ElementGroup[]> {
    return this.http.get('/parts/group-by/teams', {manufactureType});
  }

}
