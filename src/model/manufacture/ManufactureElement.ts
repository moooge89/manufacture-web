export class ManufactureElement {

  label: string = '';

  manufactured: number = 0;

  constructor(init?: Partial<ManufactureElement>) {
    Object.assign(this, init);
  }

}
