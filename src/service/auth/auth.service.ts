import {Injectable} from "@angular/core";
import {TOKEN} from "@const/LocalStorageConst";
import {Router} from "@angular/router";
import {UserInfo} from "@model/auth/UserInfo";
import {AuthController} from "@controller/AuthController";
import {of} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  private _userInfo: UserInfo | undefined;

  constructor(
    private readonly router: Router,
    private readonly authController: AuthController,
  ) {
  }

  async init() {
    await this.loadAndSetUserInfo();
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

  logout() {
    this.authController.logout().subscribe(() => {
      localStorage.setItem(TOKEN, '');
      this._userInfo = undefined;
      this.router.navigate(['/auth']).then();
    })
  }

  private async loadAndSetUserInfo() {
    this._userInfo = await this.authController.userInfo().toPromise();
  }

}
