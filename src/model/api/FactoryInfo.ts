import {GeoPoint} from "./GeoPoint";

export interface FactoryInfo {
  name: string;
  geoPoint: GeoPoint;
  workerCount: number;
  director: string;
  teamCount: number;
}
