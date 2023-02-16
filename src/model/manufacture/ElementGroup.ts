export class ElementGroup {

  label: string = '';

  count: number = 0;

  constructor(init?: Partial<ElementGroup>) {
    Object.assign(this, init);
  }

}
