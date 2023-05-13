import {Injectable} from "@angular/core";
import {HttpService} from "@service/http/http.service";
import {Observable} from "rxjs/internal/Observable";
import {ProductionInfo} from "@model/production/ProductionInfo";
import {ProductionFilter} from "@model/production/ProductionFilter";

@Injectable({providedIn: 'root'})
export class ProductionController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/manufacture-api/external/production');
  }

  loadProductionInfo(productionFilter: ProductionFilter): Observable<ProductionInfo[]> {
    return this.http.postBody('', productionFilter);
  }

}
