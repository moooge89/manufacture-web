export class Person {
  id: string = '';
  name: string = '';

  factoryId: string = '';
  factoryName: string = '';

  departmentId: string = '';
  departmentName: string = '';

  constructor(init?: Partial<Person>) {
    Object.assign(this, init);
  }

}
