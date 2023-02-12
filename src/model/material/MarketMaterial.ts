export class MarketMaterial {
  id: string = '';
  name: string = '';
  price: number = 0;

  icon: string = '';
  iconId: string = '';

  country: string = '';
  countryId: string = '';

  available: number = 0;

  constructor(init?: Partial<MarketMaterial>) {
    Object.assign(this, init);
  }

}
