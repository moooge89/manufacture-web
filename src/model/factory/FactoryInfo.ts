import {GeoPoint} from "./GeoPoint";

export class FactoryInfo {
  public id: string = '';
  public name: string = '';
  public geoPoint = new GeoPoint();
  public workerCount: number = 0;
  public directorName: string = '';
  public departmentCount: number = 0;
  public year: number = 0;

  public constructor(init?: Partial<FactoryInfo>) {
    Object.assign(this, init);
  }

}
