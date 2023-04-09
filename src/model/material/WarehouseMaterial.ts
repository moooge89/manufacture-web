export class WarehouseMaterial {
  id: number = -1;
  icon: string = '';
  name: string = '';
  available: number = 0;
  usedIn: string = '';

  constructor(init?: Partial<WarehouseMaterial>) {
    Object.assign(this, init);
  }

}
