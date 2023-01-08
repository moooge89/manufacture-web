import {Injectable} from '@angular/core';
import {AuthService} from "@service/auth/auth.service";
import {MenuItem} from "@model/web/MenuItem";
import {UserRole} from "@model/auth/UserRole";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class MenuService {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  async menuItems(): Promise<MenuItem[]> {
    const user = await this.authService.userInfo();

    const menuItems: MenuItem[] = [];

    switch (user.role) {
      case UserRole.COMPANY_DIRECTOR:
        menuItems.push(...this.menuItemsForCompanyDirector());
        break;

      case UserRole.FACTORY_DIRECTOR:
        menuItems.push(...this.menuItemsForFactoryDirector());
        break;

      case UserRole.DEPARTMENT_DIRECTOR:
        menuItems.push(...this.menuItemsForDepartmentDirector());
        break;

      case UserRole.SYSTEM_ADMIN:
        menuItems.push(...this.menuItemsForSystemAdmin());
        break;

      default:
        throw new Error('18xn6L9PE1 :: You have no right access to view menu items');
    }

    return of(menuItems).toPromise();
  }

  async redirectToDefaultPage() {
    await this.router.navigate([await this.defaultPage()]);
  }

  async redirectToDefaultPageIfNeeded() {
    if (this.router.url === '/main') {
      await this.redirectToDefaultPage();
    }
  }

  private menuItemsForCompanyDirector(): MenuItem[] {
    return [
      {label: 'Company', route: ['/main/company'], icon: 'company'},
      {label: 'Users', route: ['/main/user'], icon: 'report'},
      {label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'},
      {label: 'Market', route: ['/main/market'], icon: 'market'},
      {label: 'Production', route: ['/main/production'], icon: 'conveyor'},
      {label: 'Report', route: ['/main/report'], icon: 'report'},
    ];
  }

  private menuItemsForFactoryDirector(): MenuItem[] {
    return [
      {label: 'Factory', route: ['/main/factory'], icon: 'factory'},
      {label: 'Departments', route: ['/main/departments'], icon: 'team'},
      {label: 'Users', route: ['/main/user'], icon: 'report'},
      {label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'},
      {label: 'Market', route: ['/main/market'], icon: 'market'},
      {label: 'Production', route: ['/main/production'], icon: 'conveyor'},
      {label: 'Report', route: ['/main/report'], icon: 'report'},
    ];
  }

  private menuItemsForDepartmentDirector(): MenuItem[] {
    return [
      {label: 'Users', route: ['/main/user'], icon: 'report'},
      {label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'},
      {label: 'Market', route: ['/main/market'], icon: 'market'},
      {label: 'Budget', route: ['/main/budget'], icon: 'money'},
      {label: 'Production', route: ['/main/production'], icon: 'conveyor'},
      {label: 'Report', route: ['/main/report'], icon: 'report'},
    ];
  }

  private menuItemsForSystemAdmin(): MenuItem[] {
    return [
      {label: 'Market', route: ['/main/crud-market'], icon: 'market'},
    ];
  }

  private async defaultPage(): Promise<string> {
    const user = await this.authService.userInfo();

    let path: string;

    switch (user.role) {
      case UserRole.COMPANY_DIRECTOR:
        path = '/main/company';
        break;

      case UserRole.FACTORY_DIRECTOR:
        path = '/main/factory';
        break;

      case UserRole.DEPARTMENT_DIRECTOR:
        path = '/main/departments';
        break;

      case UserRole.SYSTEM_ADMIN:
        path = '/main/crud-market';
        break;

      default:
        throw new Error('8m2393CE94 :: You have no right access to view menu items');
    }

    return of(path).toPromise();
  }

}
