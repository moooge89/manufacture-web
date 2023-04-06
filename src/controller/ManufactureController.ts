import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {Manufacture} from "@model/manufacture/Manufacture";
import {ManufactureFilter} from "@model/filter/ManufactureFilter";
import {FilterElement} from "@model/filter/FilterElement";
import {ElementGroup} from "@model/manufacture/ElementGroup";

@Injectable({providedIn: 'root'})
export class ManufactureController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture');
  }

  // todo orken integrate
  loadManufactureRows(filter: ManufactureFilter): Observable<Manufacture[]> {
    const manufactures = [
      new Manufacture({
        manufactureType: 'WINDOW',
        manufactureTypeLabel: 'Window',
        manufacturedCount: 12,
        hrInvolved: 3,
      }),

      new Manufacture({
        manufactureType: 'DOOR',
        manufactureTypeLabel: 'Door',
        manufacturedCount: 6,
        hrInvolved: 2,
      }),

      new Manufacture({
        manufactureType: 'ASSEMBLE',
        manufactureTypeLabel: 'Assemble',
        manufacturedCount: 2,
        hrInvolved: 4,
      }),
    ];

    if (1 == 1) {
      return of(manufactures);
    }

    return this.http.get('/list', {filter});
  }

  // todo orken integrate
  loadManufactureTypesAsFilterElements(): Observable<FilterElement[]> {
    const filterElements = [
      {id: 'WINDOW', displayValue: 'Window'},

      {id: 'DOOR', displayValue: 'Door'},

      {id: 'ASSEMBLE', displayValue: 'Assemble'},
    ];

    if (1 == 1) {
      return of(filterElements);
    }

    return this.http.get('/filter-element');
  }

  // todo orken integrate
  loadManufactureElements(manufactureType: string): Observable<ElementGroup[]> {
    const manufactureElements = [
      new ElementGroup('First team', 123),

      new ElementGroup('Second team', 213),

      new ElementGroup('Third team', 102),
    ];

    if (1 == 1) {
      return of(manufactureElements);
    }

    return this.http.get('/by-type', {manufactureType});
  }

}
