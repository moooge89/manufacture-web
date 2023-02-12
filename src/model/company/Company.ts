export class Company {

  name: string = '';

  directorName: string = '';

  workerCount: number = 0;

  factoryCount: number = 0;

  constructor(init?: Partial<Company>) {
    Object.assign(this, init);
  }

}
