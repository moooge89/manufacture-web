export class LightFactoryInfo {
  id: string = '';
  name: string = '';
  workerCount: number = 0;
  directorName: string = '';

  constructor(init?: Partial<LightFactoryInfo>) {
    Object.assign(this, init);
  }

}
