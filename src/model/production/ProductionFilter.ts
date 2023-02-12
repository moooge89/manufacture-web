export class ProductionFilter {
  factoryId: string = '';
  departmentId: string = '';

  constructor(init?: Partial<ProductionFilter>) {
    Object.assign(this, init);
  }

}
