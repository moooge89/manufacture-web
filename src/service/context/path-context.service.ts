import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class PathContextService {

  // region lastFactoryId

  private _lastFactoryId: string = '';

  set lastFactoryId(lastFactoryId: string) {
    this._lastFactoryId = lastFactoryId;
  }

  get lastFactoryId() {
    const ret = this._lastFactoryId;
    this._lastFactoryId = '';
    return ret;
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
