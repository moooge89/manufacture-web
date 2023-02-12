export class GeoPoint {
  public longitude: number = 0;
  public latitude: number = 0;

  public constructor(init?: Partial<GeoPoint>) {
    Object.assign(this, init);
  }

}
