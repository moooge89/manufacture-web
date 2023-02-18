export class ElementGroup {
  readonly label: string = '';
  readonly count: number = 0;

  constructor(private _label: string,
              private _count: number) {
    this.label = _label;
    this.count = _count;
  }

}
