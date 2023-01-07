import {Injectable} from "@angular/core";
import {FACTORY_PATH_CONTEXT} from "@const/LocalStorageConst";

@Injectable({providedIn: 'root'})
export class PathContextService {

  // region lastFactoryId

  set lastFactoryId(lastFactoryId: string) {
    localStorage.setItem(FACTORY_PATH_CONTEXT, lastFactoryId);
  }

  get lastFactoryId() {
    return localStorage.getItem(FACTORY_PATH_CONTEXT) || '';
  }

  clearLastFactoryId(): void {
    localStorage.setItem(FACTORY_PATH_CONTEXT, '');
  }

  // endregion lastFactoryId


  // region materialName

  private _materialName: string = '';

  set materialName(materialName: string) {
    this._materialName = materialName;
  }

  get materialName() {
    const ret = this._materialName;
    this._materialName = '';
    return ret;
  }

  // endregion materialName

}
