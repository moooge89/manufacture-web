export class Company {

  name: string = '';

  directorName: string = '';

  workersCount: number = 0;

  factoriesCount: number = 0;

  constructor(init?: Partial<Company>) {
    Object.assign(this, init);
  }

}
