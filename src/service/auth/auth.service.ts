import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserInfo} from "@model/auth/UserInfo";
import {AuthController} from "@controller/AuthController";
import {of} from "rxjs";
import {TOKEN_HEADER, TOKEN_PREFIX} from "@const/LocalStorageConst";
import {UserController} from "@controller/UserController";

@Injectable({providedIn: 'root'})
export class AuthService {

  private _userInfo: UserInfo | undefined;

  constructor(
    private readonly router: Router,
    private readonly authController: AuthController,
    private readonly userController: UserController,
  ) {
  }

  async init(): Promise<void> {
    this._userInfo = await this.userController.userInfo().toPromise();
  }

  async validateToken(): Promise<boolean> {
    return await this.authController.isValidToken().toPromise();
  }

  async userInfo(): Promise<UserInfo> {
    if (!this._userInfo) {
      await this.init();
    }

    if (!this._userInfo) {
      throw new Error('IyY3pS6Qdc :: Could not successfully initialize user info');
    }

    return of(this._userInfo).toPromise();
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_HEADER, TOKEN_PREFIX + token);
  }

  logout(): void {
    this.authController.logout().subscribe(async () => {
      this.setToken('');
      this._userInfo = undefined;
      await this.router.navigate(['/auth']);
    });
  }

  isTokenProvided(): boolean {
    return !!localStorage.getItem(TOKEN_HEADER);
  }

}
