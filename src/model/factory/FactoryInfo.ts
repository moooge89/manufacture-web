import {GeoPoint} from "./GeoPoint";

export class FactoryInfo {
  id: string = '';
  name: string = '';
  geoPoint = new GeoPoint(0, 0);
  workerCount: number = 0;
  directorName: string = '';
  departmentCount: number = 0;
  year: number = 0;

  constructor(init?: Partial<FactoryInfo>) {
    Object.assign(this, init);
  }

}
