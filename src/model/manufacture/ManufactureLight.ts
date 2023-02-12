export class ManufactureLight {

  manufactureType: string = '';

  manufactureTypeLabel: string = '';

  manufacturedCount: number = 0;

  hrInvolved: number = 0;

  constructor(init?: Partial<ManufactureLight>) {
    Object.assign(this, init);
  }

}
