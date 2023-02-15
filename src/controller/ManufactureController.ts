import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {Manufacture} from "@model/manufacture/Manufacture";
import {ManufactureFilter} from "@model/filter/ManufactureFilter";
import {FilterElement} from "@model/filter/FilterElement";
import {ManufactureElement} from "@model/manufacture/ManufactureElement";

@Injectable({providedIn: 'root'})
export class ManufactureController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture');
  }

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

  loadManufactureTypesAsFilterElements(): Observable<FilterElement[]> {
    const filterElements = [
      new FilterElement({
        id: 'WINDOW',
        name: 'Window',
      }),

      new FilterElement({
        id: 'DOOR',
        name: 'Door',
      }),

      new FilterElement({
        id: 'ASSEMBLE',
        name: 'Assemble',
      }),
    ];

    if (1 == 1) {
      return of(filterElements);
    }

    return this.http.get('/filter-element');
  }

  loadManufactureElements(manufactureType: string): Observable<ManufactureElement[]> {
    const manufactureElements = [
      new ManufactureElement({
        label: 'First team',
        manufactured: 123,
      }),

      new ManufactureElement({
        label: 'Second team',
        manufactured: 213,
      }),

      new ManufactureElement({
        label: 'Third team',
        manufactured: 102,
      }),
    ];

    if (1 == 1) {
      return of(manufactureElements);
    }

    return this.http.get('/by-type', {manufactureType});
  }

}
