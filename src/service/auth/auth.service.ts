import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserInfo} from "@model/auth/UserInfo";
import {AuthController} from "@controller/AuthController";
import {of} from "rxjs";
import {TOKEN_HEADER, TOKEN_PREFIX} from "@const/LocalStorageConst";
import {UserController} from "@controller/UserController";
import {Specialization} from "@model/user/Specialization";
import {BottomNotificationService} from "@service/bottom-notification/bottom-notification.service";

@Injectable({providedIn: 'root'})
export class AuthService {

  private _userInfo: UserInfo | undefined;

  constructor(
    private readonly router: Router,
    private readonly authController: AuthController,
    private readonly userController: UserController,
    private readonly notificationService: BottomNotificationService,
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

    if (!this.isSpecSupported()) {
      this.logout();
      this.notificationService.showError('You cannot use web application');

      const empty: UserInfo = {
        id: -1,
        specialization: Specialization.DEFAULT,
        factory: -1,
        department: -1,
        firstName: '',
        lastName: '',
        phone: '',
        team: -1,
        username: '',
      };

      return of(empty).toPromise();
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

  private isSpecSupported(): boolean {
    const spec = this._userInfo?.specialization;

    if (!spec) {
      return false;
    }

    return spec === Specialization.COMPANY_DIRECTOR
      || spec === Specialization.FACTORY_DIRECTOR
      || spec === Specialization.DEPARTMENT_DIRECTOR
      || spec === Specialization.SYSTEM_ADMIN;
  }

}
