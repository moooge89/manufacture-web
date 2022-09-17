import {Component, OnDestroy, OnInit} from '@angular/core';
import {Unsub} from "../../util/Unsub";
import {AuthController} from "../../controller/AuthController";
import {encode} from "../../util/Encoder";
import {LoginInfo} from "../../model/auth/LoginInfo";
import {Router} from "@angular/router";
import {TOKEN} from "../../consts/LocalStorageConst";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  username: string = '';
  password: string = '';

  usernameHasError: boolean = false;
  passwordHasError: boolean = false;

  private unsub = new Unsub();

  constructor(private readonly router: Router,
              private readonly authController: AuthController) {
  }

  async ngOnInit() {
    const token = localStorage.getItem(TOKEN);

    // todo era resolve this
    if (token) {
      await this.router.navigate(['/main']);
    }
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  login(): void {
    if (!this.username) {
      this.usernameHasError = true;
    }

    if (!this.password) {
      this.passwordHasError = true;
    }

    if (this.usernameHasError || this.passwordHasError) {
      return;
    }

    const encodedUsername = encode(this.username);
    const encodedPassword = encode(this.password);

    const loginInfo: LoginInfo = {
      username: encodedUsername,
      password: encodedPassword,
    }

    this.unsub.sub = this.authController.login(loginInfo).subscribe(token => {
      localStorage.setItem(TOKEN, token);
      this.router.navigate(['/main']).then();
    });
  }

  usernameFocused(): void {
    if (!this.usernameHasError) {
      return;
    }

    this.usernameHasError = false;
  }

  passwordFocused(): void {
    if (!this.passwordHasError) {
      return;
    }

    this.passwordHasError = false;
  }

}
