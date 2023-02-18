export class GeoPoint {
  readonly longitude: number;
  readonly latitude: number;

  constructor(private _longitude: number,
              private _latitude: number) {
    this.longitude = _longitude;
    this.latitude = _latitude;
  }

}
