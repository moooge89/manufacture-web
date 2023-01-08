import {Person} from "../person/Person";

export interface Department {
  id: string;
  name: string;
  teamCount: number;
  workerCount: number;
  persons: Person[];
}
