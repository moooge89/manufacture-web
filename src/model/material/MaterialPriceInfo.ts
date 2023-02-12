export class MaterialPriceInfo {

  min: number = 0;

  max: number = 0;

  avg: number = 0;

  constructor(init?: Partial<MaterialPriceInfo>) {
    Object.assign(this, init);
  }

}
