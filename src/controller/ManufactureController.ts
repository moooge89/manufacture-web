import {Injectable} from '@angular/core';
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {ManufactureLight} from "@model/manufacture/ManufactureLight";
import {ManufactureFilter} from "@model/filter/ManufactureFilter";
import {FilterElement} from "@model/filter/FilterElement";
import {ManufactureElement} from "@model/manufacture/ManufactureElement";

@Injectable({providedIn: 'root'})
export class ManufactureController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture');
  }

  loadManufactureRows(filter: ManufactureFilter): Observable<ManufactureLight[]> {
    const manufactures = [
      new ManufactureLight({
        manufactureType: 'WINDOW',
        manufactureTypeLabel: 'Window',
        manufacturedCount: 12,
        hrInvolved: 3,
      }),

      new ManufactureLight({
        manufactureType: 'DOOR',
        manufactureTypeLabel: 'Door',
        manufacturedCount: 6,
        hrInvolved: 2,
      }),

      new ManufactureLight({
        manufactureType: 'ASSEMBLE',
        manufactureTypeLabel: 'Assemble',
        manufacturedCount: 2,
        hrInvolved: 4,
      }),
    ];

    return of(manufactures);
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

    return of(filterElements);
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

    return of(manufactureElements);
  }

}
