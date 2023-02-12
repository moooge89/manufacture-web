export class MarketMaterial {
  id: string = '';
  name: string = '';
  price: number = 0;

  icon: string = '';
  iconId: string = '';

  country: string = '';
  countryId: string = '';

  constructor(init?: Partial<MarketMaterial>) {
    Object.assign(this, init);
  }

}
