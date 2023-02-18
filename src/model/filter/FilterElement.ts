export class FilterElement {

  readonly id: string;
  readonly name: string;

  constructor(private _id: string,
              private _name: string) {
    this.id = _id;
    this.name = _name;
  }

}
