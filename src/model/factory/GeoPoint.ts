export class GeoPoint {
  longitude: number = 0;
  latitude: number = 0;

  constructor(init?: Partial<GeoPoint>) {
    Object.assign(this, init);
  }

}
