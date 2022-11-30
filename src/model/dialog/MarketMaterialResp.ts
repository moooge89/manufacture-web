import {MarketMaterial} from "@model/api/material/MarketMaterial";

export interface MarketMaterialResp {
  needToSave: boolean;
  material: MarketMaterial | undefined;
}
