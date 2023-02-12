import {UserRole} from "@model/auth/UserRole";

export class UserInfo {

  public id: string = '';
  public role: UserRole = UserRole.UNKNOWN;
  public name: string = '';

  public constructor(init?: Partial<UserInfo>) {
    Object.assign(this, init);
  }

  public canViewFactory(): boolean {
    return this.role === UserRole.COMPANY_DIRECTOR;
  }

  public canViewDepartment(): boolean {
    return this.role === UserRole.COMPANY_DIRECTOR || this.role === UserRole.FACTORY_DIRECTOR;
  }

}
