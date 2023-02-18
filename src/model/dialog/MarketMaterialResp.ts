import {MarketMaterial} from "@model/material/MarketMaterial";

export class MarketMaterialResp {
  readonly needToSave: boolean;
  readonly material: MarketMaterial | undefined;

  constructor(private _needToSave: boolean,
              private _material: MarketMaterial | undefined) {
    this.needToSave = _needToSave;
    this.material = _material;
  }

  static noNeedToSave(): MarketMaterialResp {
    return new MarketMaterialResp(false, undefined);
  }

  static save(material: MarketMaterial): MarketMaterialResp {
    return new MarketMaterialResp(true, material);
  }

  doesNotNeedToSave(): boolean {
    return !this.needToSave;
  }

}
