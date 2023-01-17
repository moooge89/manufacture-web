import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {MarketMaterial} from "@model/api/material/MarketMaterial";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {MaterialPriceInfo} from "@model/market/MaterialPriceInfo";

@Injectable({providedIn: 'root'})
export class MarketController {

  // todo era во всех контроллерах использовать REST (POST, PUT и тд)

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/market');
  }

  createMarketMaterial(material: MarketMaterial): Observable<string> {
    return of('2');
  }

  updateMarketMaterial(material: MarketMaterial): Observable<void> {
    return of(undefined);
  }

  loadMarketMaterials(materialFilter: MaterialFilter): Observable<MarketMaterial[]> {
    const materials: MarketMaterial[] = [
      {
        id: '1',
        icon: 'sand',
        name: 'Sand',
        country: 'Kazakhstan',
        price: 16,
      },
    ];
    return of(materials);
  }

  deleteMarketMaterials(ids: Set<String>): Observable<void> {
    return of(undefined);
  }

  buyMaterial(id: string, kgToBuy: number): Observable<void> {
    return of(undefined);
  }

  loadMaterialPriceInfo(id: string): Observable<MaterialPriceInfo> {
    const materialPriceInfo: MaterialPriceInfo = {
      min: 12,
      max: 24,
      avg: 18,
    };

    return of(materialPriceInfo);
  }

}
