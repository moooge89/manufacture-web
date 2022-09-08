export class LoginInfo {
  public readonly username: number[];
  public readonly password: number[];

  public constructor(username: number[], password: number[]) {
    this.username = username;
    this.password = password;
  }

}
