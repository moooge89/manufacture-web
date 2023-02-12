export class Person {
  id: string = '';
  name: string = '';

  factoryId: string = '';
  factoryName: string = '';

  departmentId: string = '';
  departmentName: string = '';

  index: number = 0;

  constructor(init?: Partial<Person>) {
    Object.assign(this, init);
  }

}
