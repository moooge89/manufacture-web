export class FilterElement {
  id: string = '';
  name: string = '';

  constructor(init?: Partial<FilterElement>) {
    Object.assign(this, init);
  }

}
