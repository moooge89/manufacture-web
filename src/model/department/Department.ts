import {Person} from "@model/person/Person";

export class Department {
  id: string = '';
  name: string = '';
  teamCount: number = 0;
  workerCount: number = 0;
  persons: Person[] = [];

  constructor(init?: Partial<Department>) {
    Object.assign(this, init);
  }

}
