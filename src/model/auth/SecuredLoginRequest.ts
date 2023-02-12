import {encode} from "@util/Encoder";

export class SecuredLoginRequest {

  readonly username: number[];
  readonly password: number[];

  constructor(_username: string, _password: string) {
    this.username = encode(_username);
    this.password = encode(_password);
  }

}
