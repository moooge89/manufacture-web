export class MenuItem {
  label: string = '';
  route: string[] = [];
  icon: string = '';

  constructor(init?: Partial<MenuItem>) {
    Object.assign(this, init);
  }

}
