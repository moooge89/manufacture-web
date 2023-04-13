import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {MarketMaterial} from "@model/material/MarketMaterial";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {MaterialPriceInfo} from "@model/material/MaterialPriceInfo";
import {map} from "rxjs/operators";
import {NumberWrapper} from "@model/wrapper/NumberWrapper";

@Injectable({providedIn: 'root'})
export class MarketController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/market');
  }

  createMarketMaterial(material: MarketMaterial): Observable<number> {
    if (1 == 1) {
      return of(2);
    }

    return this.http.postBody<NumberWrapper>('', material).pipe(map(x => x.value));
  }

  updateMarketMaterial(material: MarketMaterial): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.putBody('/' + material.id, material);
  }

  loadMarketMaterials(materialFilter: MaterialFilter): Observable<MarketMaterial[]> {
    return this.http.postBody('/filtered', materialFilter);
  }

  deleteMarketMaterials(ids: Set<number>): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.delete('', {ids});
  }

  buyMaterial(id: number, kgToBuy: number): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.patch('/' + id, {kgToBuy});
  }

  loadMaterialPriceInfo(id: number): Observable<MaterialPriceInfo> {
    return this.http.get('/price-list/' + id);
  }

}
