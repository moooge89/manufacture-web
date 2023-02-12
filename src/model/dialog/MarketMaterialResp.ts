import {MarketMaterial} from "@model/material/MarketMaterial";

export class MarketMaterialResp {
  public needToSave: boolean = false;
  public material: MarketMaterial | undefined;

  public constructor(init?: Partial<MarketMaterialResp>) {
    Object.assign(this, init);
  }

  public static noNeedToSave(): MarketMaterialResp {
    return new MarketMaterialResp({needToSave: false});
  }

  public static save(material: MarketMaterial): MarketMaterialResp {
    return new MarketMaterialResp({needToSave: true, material: material});
  }

  public doesNotNeedToSave(): boolean {
    return !this.needToSave;
  }

}
