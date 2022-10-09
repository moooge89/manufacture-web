import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {MarketMaterial} from "@model/api/material/MarketMaterial";

@Injectable({providedIn: 'root'})
export class MarketController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/market');
  }

  loadMarketMaterials(): Observable<MarketMaterial[]> {
    const materials: MarketMaterial[] = [
      {
        icon: 'sand',
        name: 'Sand',
        country: 'Kazakhstan',
        price: 16,
      },
    ];
    return of(materials);
  }

}
