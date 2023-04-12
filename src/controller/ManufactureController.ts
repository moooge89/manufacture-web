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

  // todo orken integrate
  // done
  loadManufactureTypesAsFilterElements(): Observable<FilterElement[]> {
    const filterElements = [
      {id: 1, displayValue: 'Window'},

      {id: 2, displayValue: 'Door'},

      {id: 3, displayValue: 'Assemble'},
    ];

    // if (1 == 1) {
    //   return of(filterElements);
    // }

    return this.http.get('/parts/filter-elements');
  }

  // todo orken integrate
  // done
  loadManufactureElements(manufactureType: string): Observable<ElementGroup[]> {
    const manufactureElements = [

      {
        label: 'First team',
        count: 123,
      },

      {
        label: 'Second team',
        count: 213,
      },

      {
        label: 'Third team',
        count: 102,
      },

    ];

    // if (1 == 1) {
    //   return of(manufactureElements);
    // }

    return this.http.get('/parts/group-by/teams', {manufactureType});
  }

}
