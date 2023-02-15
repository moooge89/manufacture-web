export class Manufacture {

  manufactureType: string = '';

  manufactureTypeLabel: string = '';

  manufacturedCount: number = 0;

  hrInvolved: number = 0;

  constructor(init?: Partial<Manufacture>) {
    Object.assign(this, init);
  }

}
