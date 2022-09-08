import {Component, OnDestroy} from '@angular/core';
import {Unsub} from "../../util/Unsub";
import {AuthController} from "../../controller/AuthController";
import {encode} from "../../util/Encoder";
import {LoginInfo} from "../../model/auth/LoginInfo";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {

  username: string = '';
  password: string = '';

  private unsub = new Unsub();

  constructor(private readonly authController: AuthController) {
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  login(): void {

    // todo era check before encoding for null and other constraints

    const encodedUsername = encode(this.username);
    const encodedPassword = encode(this.password);

    const loginInfo = new LoginInfo(encodedUsername, encodedPassword);

    this.unsub.sub = this.authController.login(loginInfo).subscribe(x => console.log(x));
  }

}
