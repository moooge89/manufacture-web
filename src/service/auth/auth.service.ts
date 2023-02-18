import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserInfo} from "@model/auth/UserInfo";
import {AuthController} from "@controller/AuthController";
import {of} from "rxjs";
import {TOKEN_HEADER, TOKEN_PREFIX} from "@const/LocalStorageConst";

@Injectable({providedIn: 'root'})
export class AuthService {

  private _userInfo: UserInfo | undefined;

  constructor(
    private readonly router: Router,
    private readonly authController: AuthController,
  ) {
  }

  async init(): Promise<void> {
    await this.loadAndSetUserInfo();
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
    this.authController.logout().subscribe(() => {
      this.setToken('');
      this._userInfo = undefined;
      this.router.navigate(['/auth']).then();
    });
  }

  isTokenProvided(): boolean {
    return !!localStorage.getItem(TOKEN_HEADER);
  }

  private async loadAndSetUserInfo(): Promise<void> {
    this._userInfo = await this.authController.userInfo().toPromise();
  }

}
