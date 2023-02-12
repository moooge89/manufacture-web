import {Component, OnDestroy, OnInit} from '@angular/core';
import {Unsub} from "@util/Unsub";
import {AuthController} from "@controller/AuthController";
import {SecuredLoginRequest} from "@model/auth/SecuredLoginRequest";
import {Router} from "@angular/router";
import {TOKEN} from "@const/LocalStorageConst";
import {InputError} from "@model/web/InputError";
import {MenuService} from "@service/menu/menu.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  username: string = '';
  password: string = '';

  usernameError: InputError = {hasError: false, errorText: ''};
  passwordError: InputError = {hasError: false, errorText: ''};

  private unsub = new Unsub();

  constructor(private readonly router: Router,
              private readonly menuService: MenuService,
              private readonly authController: AuthController) {
  }

  async ngOnInit() {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      await this.router.navigate(['/main']);
    }
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  async login(): Promise<void> {
    if (!this.username) {
      this.usernameError.hasError = true;
      this.usernameError.errorText = 'Username is blank';
    }

    if (!this.password) {
      this.passwordError.hasError = true;
      this.passwordError.errorText = 'Password is blank';
    }

    if (this.hasAnyError) {
      return;
    }

    const securedLoginRequest = new SecuredLoginRequest(this.username, this.password);

    this.unsub.sub = this.authController.login(securedLoginRequest).subscribe(async token => {
      localStorage.setItem(TOKEN, token);
      await this.menuService.redirectToDefaultPage();
    });
  }

  usernameFocused(): void {
    if (!this.usernameError.hasError) {
      return;
    }

    this.usernameError.hasError = false;
  }

  passwordFocused(): void {
    if (!this.passwordError.hasError) {
      return;
    }

    this.passwordError.hasError = false;
  }

  async handleEnterClick(keyboardEvent: KeyboardEvent): Promise<void> {
    if (keyboardEvent.code !== 'Enter') {
      return;
    }

    await this.login();
  }

  get hasAnyError(): boolean {
    return this.usernameError.hasError || this.passwordError.hasError;
  }

}
