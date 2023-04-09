export class ProductionFilter {
  factoryId: number = -1;
  departmentId: number = -1;

  constructor(init?: Partial<ProductionFilter>) {
    Object.assign(this, init);
  }

}
