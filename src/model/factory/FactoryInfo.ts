import {GeoPoint} from "./GeoPoint";

export interface FactoryInfo {
  id: number;
  name: string;
  geoPoint: GeoPoint;
  workerCount: number;
  directorName: string;
  departmentCount: number;
  year: number;
}
