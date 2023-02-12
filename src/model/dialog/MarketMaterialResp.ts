import {MarketMaterial} from "@model/material/MarketMaterial";

export class MarketMaterialResp {
  needToSave: boolean = false;
  material: MarketMaterial | undefined;

  constructor(init?: Partial<MarketMaterialResp>) {
    Object.assign(this, init);
  }

  static noNeedToSave(): MarketMaterialResp {
    return new MarketMaterialResp({needToSave: false});
  }

  static save(material: MarketMaterial): MarketMaterialResp {
    return new MarketMaterialResp({needToSave: true, material: material});
  }

  doesNotNeedToSave(): boolean {
    return !this.needToSave;
  }

}
