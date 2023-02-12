export class NumberRange {
  min: number | undefined;
  max: number | undefined;

  constructor(init?: Partial<NumberRange>) {
    Object.assign(this, init);
  }

}
