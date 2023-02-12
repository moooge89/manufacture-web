import {UserRole} from "@model/auth/UserRole";

export class UserInfo {

  id: string = '';
  role: UserRole = UserRole.UNKNOWN;
  name: string = '';

  constructor(init?: Partial<UserInfo>) {
    Object.assign(this, init);
  }

  canViewFactory(): boolean {
    return this.role === UserRole.COMPANY_DIRECTOR;
  }

  canViewDepartment(): boolean {
    return this.role === UserRole.COMPANY_DIRECTOR || this.role === UserRole.FACTORY_DIRECTOR;
  }

  isCompanyDirector(): boolean {
    return this.role === UserRole.COMPANY_DIRECTOR;
  }

  isFactoryDirector(): boolean {
    return this.role === UserRole.FACTORY_DIRECTOR;
  }

}
