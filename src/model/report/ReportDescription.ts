export class ReportDescription {
  categories: string[] = [];

  firstCountLabel: string = '';
  firstCountScale: number[] = [];

  secondCountLabel: string = '';
  secondCountScale: number[] = [];

  firstCoefLabel: string = '';
  firstCoefScale: number[] = [];

  secondCoefLabel: string = '';
  secondCoefScale: number[] = [];

  constructor(init?: Partial<ReportDescription>) {
    Object.assign(this, init);
  }

}
