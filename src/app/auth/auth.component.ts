import {Component, OnDestroy, OnInit} from '@angular/core';
import {Unsub} from "@util/Unsub";
import {AuthController} from "@controller/AuthController";
import {SecuredLoginRequest} from "@model/auth/SecuredLoginRequest";
import {Router} from "@angular/router";
import {InputError} from "@model/web/InputError";
import {MenuService} from "@service/menu/menu.service";
import {AuthService} from "@service/auth/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  username: string = '';
  password: string = '';

  readonly usernameError = new InputError();
  readonly passwordError = new InputError();

  private readonly unsub = new Unsub();

  constructor(private readonly router: Router,
              private readonly menuService: MenuService,
              private readonly authService: AuthService,
              private readonly authController: AuthController) {
  }

  async ngOnInit() {
    const isTokenValid = await this.authService.validateToken();

    if (isTokenValid) {
      await this.router.navigate(['/main']);
    }
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  async login(): Promise<void> {
    this.validate();

    if (this.hasAnyError()) {
      return;
    }

    const securedLoginRequest = new SecuredLoginRequest(this.username, this.password);

    this.unsub.sub = this.authController.login(securedLoginRequest).subscribe(async token => {

        if (token) {
          this.authService.setToken(token);
          await this.menuService.redirectToDefaultPage();
        } else {
          this.usernameError.error('Username or password is incorrect');
          this.passwordError.error('Username or password is incorrect');
        }

      },
    );

  }

  usernameFocused(): void {
    this.usernameError.clearIfHasError();
  }

  passwordFocused(): void {
    this.passwordError.clearIfHasError();
  }

  async handleEnterClick(keyboardEvent: KeyboardEvent): Promise<void> {
    if (keyboardEvent.code !== 'Enter') {
      return;
    }

    await this.login();
  }

  private validate(): void {

    if (!this.username) {
      this.usernameError.error('Username is blank');
    }

    if (!this.password) {
      this.passwordError.error('Password is blank');
    }

  }

  private hasAnyError(): boolean {
    return this.usernameError.hasError || this.passwordError.hasError;
  }

}
