import {Person} from "@model/person/Person";

export class Department {
  public id: string = '';
  public name: string = '';
  public teamCount: number = 0;
  public workerCount: number = 0;
  public persons: Person[] = [];

  public constructor(init?: Partial<Department>) {
    Object.assign(this, init);
  }

}
