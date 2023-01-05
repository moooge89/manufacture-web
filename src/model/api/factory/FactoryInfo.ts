import {GeoPoint} from "./GeoPoint";

export interface FactoryInfo {
  id: string;
  name: string;
  geoPoint: GeoPoint;
  workerCount: number;
  director: string;
  departmentCount: number;
  year: number;
}
