import {Injectable} from '@angular/core';
import {FactoryInfo} from "@model/factory/FactoryInfo";

@Injectable({providedIn: 'root'})
export class PopUpService {

  makeFactoryInfoPopup(factoryInfo: FactoryInfo): string {
    return `` +
      `<div>Name: ${factoryInfo.name}</div>` +
      `<div>Director: ${factoryInfo.director}</div>` +
      `<div>Workers: ${factoryInfo.workersCount}</div>`
  }

}
