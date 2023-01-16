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
    const manufactures: ManufactureLight[] = [
      {
        manufactureType: 'WINDOW',
        manufactureTypeLabel: 'Window',
        manufacturedCount: 12,
        hrInvolved: 3,
      },
      {
        manufactureType: 'DOOR',
        manufactureTypeLabel: 'Door',
        manufacturedCount: 6,
        hrInvolved: 2,
      },
      {
        manufactureType: 'ASSEMBLE',
        manufactureTypeLabel: 'Assemble',
        manufacturedCount: 2,
        hrInvolved: 4,
      },
    ];

    return of(manufactures);
  }

  loadManufactureTypesAsFilterElements(): Observable<FilterElement[]> {
    const filterElements: FilterElement[] = [
      {
        id: 'WINDOW',
        name: 'Window',
      },
      {
        id: 'DOOR',
        name: 'Door',
      },
      {
        id: 'ASSEMBLE',
        name: 'Assemble',
      },
    ];

    return of(filterElements);
  }

  loadManufactureElements(manufactureType: string): Observable<ManufactureElement[]> {
    const manufactureElements: ManufactureElement[] = [
      {
        label: 'First team',
        manufactured: 123,
      },
      {
        label: 'Second team',
        manufactured: 213,
      },
      {
        label: 'Third team',
        manufactured: 102,
      },
    ];

    return of(manufactureElements);
  }

}
