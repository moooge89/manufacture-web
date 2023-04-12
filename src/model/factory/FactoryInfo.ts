import {GeoPoint} from "./GeoPoint";

export interface FactoryInfo {
  id: number;
  name: string;
  geoPoint: GeoPoint;
  workersCount: number;
  director: string;
  departmentCount: number;
  year: number;
}
