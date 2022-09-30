import {Person} from "./Person";

export interface Department {
  id: string;
  name: string;
  teamCount: number;
  workerCount: number;
  persons: Person[];
}
