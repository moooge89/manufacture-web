import {Injectable} from '@angular/core';
import {FactoryInfo} from "@model/factory/FactoryInfo";

@Injectable({providedIn: 'root'})
export class PopUpService {

  makeFactoryInfoPopup(factoryInfo: FactoryInfo): string {
    return `` +
      `<div>Name: ${factoryInfo.name}</div>` +
      `<div>Director: ${factoryInfo.directorName}</div>` +
      `<div>Workers: ${factoryInfo.workerCount}</div>`
  }

}
