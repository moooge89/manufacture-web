import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {MarketMaterial} from "@model/material/MarketMaterial";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {MaterialPriceInfo} from "@model/material/MaterialPriceInfo";
import {StringWrapper} from "@model/wrapper/StringWrapper";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class MarketController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/market');
  }

  createMarketMaterial(material: MarketMaterial): Observable<string> {
    if (1 == 1) {
      return of('2');
    }

    return this.http.postBody<StringWrapper>('', material).pipe(map(x => x.value));
  }

  updateMarketMaterial(material: MarketMaterial): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.putBody('/' + material.id, material);
  }

  // todo orken integrate
  loadMarketMaterials(materialFilter: MaterialFilter): Observable<MarketMaterial[]> {
    const materials = [
      new MarketMaterial({
        id: '1',
        icon: 'sand',
        iconId: '6',
        name: 'Sand',
        country: 'Kazakhstan',
        countryId: '1',
        price: 16,
        available: 150,
      }),
    ];

    if (1 == 1) {
      return of(materials);
    }

    return this.http.get('/list', {materialFilter});
  }

  deleteMarketMaterials(ids: Set<String>): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.delete('', {ids});
  }

  buyMaterial(id: string, kgToBuy: number): Observable<void> {
    if (1 == 1) {
      return of(undefined);
    }

    return this.http.patch('/' + id, {kgToBuy});
  }

  // todo orken integrate
  loadMaterialPriceInfo(id: string): Observable<MaterialPriceInfo> {
    const materialPriceInfo = new MaterialPriceInfo({
      min: 12,
      max: 24,
      avg: 18,
    });

    if (1 == 1) {
      return of(materialPriceInfo);
    }

    return this.http.get('/price-list/' + id);
  }

}
