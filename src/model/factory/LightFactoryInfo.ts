export class LightFactoryInfo {
  public id: string = '';
  public name: string = '';
  public workerCount: number = 0;
  public directorName: string = '';

  public constructor(init?: Partial<LightFactoryInfo>) {
    Object.assign(this, init);
  }

}
