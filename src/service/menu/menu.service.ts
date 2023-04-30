import {Injectable} from '@angular/core';
import {AuthService} from "@service/auth/auth.service";
import {MenuItem} from "@model/web/MenuItem";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {Specialization} from "@model/user/Specialization";

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

    switch (user.specialization) {
      case Specialization.COMPANY_DIRECTOR:
        menuItems.push(...this.menuItemsForCompanyDirector());
        break;

      case Specialization.FACTORY_DIRECTOR:
        menuItems.push(...this.menuItemsForFactoryDirector());
        break;

      case Specialization.DEPARTMENT_DIRECTOR:
        menuItems.push(...this.menuItemsForDepartmentDirector());
        break;

      case Specialization.SYSTEM_ADMIN:
        menuItems.push(...this.menuItemsForSystemAdmin());
        break;

      default:
        throw new Error('18xn6L9PE1 :: You have no right access to view menu items');
    }

    return of(menuItems).toPromise();
  }

  async redirectToDefaultPage(): Promise<void> {
    await this.router.navigate([await this.defaultPage()]);
  }

  async redirectToDefaultPageIfNeeded(): Promise<void> {
    if (this.router.url === '/main') {
      await this.redirectToDefaultPage();
    }
  }

  private menuItemsForCompanyDirector(): MenuItem[] {
    return [
      new MenuItem({label: 'Company', route: ['/main/company'], icon: 'company'}),
      new MenuItem({label: 'Users', route: ['/main/user'], icon: 'report'}),
      new MenuItem({label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'}),
      new MenuItem({label: 'Market', route: ['/main/market'], icon: 'market'}),
      new MenuItem({label: 'Manufacture', route: ['/main/manufacture'], icon: 'puzzle'}),
      new MenuItem({label: 'Production', route: ['/main/production'], icon: 'conveyor'}),
      new MenuItem({label: 'Report', route: ['/main/report'], icon: 'report'}),
      new MenuItem({label: 'Analytics', route: ['/main/analytics'], icon: 'analyze'}),
    ];
  }

  private menuItemsForFactoryDirector(): MenuItem[] {
    return [
      new MenuItem({label: 'Factory', route: ['/main/factory'], icon: 'factory'}),
      new MenuItem({label: 'Departments', route: ['/main/departments'], icon: 'team'}),
      new MenuItem({label: 'Users', route: ['/main/user'], icon: 'report'}),
      new MenuItem({label: 'Budget', route: ['/main/accept-budget'], icon: 'money'}),
      new MenuItem({label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'}),
      new MenuItem({label: 'Market', route: ['/main/market'], icon: 'market'}),
      new MenuItem({label: 'Manufacture', route: ['/main/manufacture'], icon: 'puzzle'}),
      new MenuItem({label: 'Production', route: ['/main/production'], icon: 'conveyor'}),
      new MenuItem({label: 'Report', route: ['/main/report'], icon: 'report'}),
      new MenuItem({label: 'Analytics', route: ['/main/analytics'], icon: 'analyze'}),
    ];
  }

  private menuItemsForDepartmentDirector(): MenuItem[] {
    return [
      new MenuItem({label: 'Users', route: ['/main/user'], icon: 'report'}),
      new MenuItem({label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'}),
      new MenuItem({label: 'Market', route: ['/main/market'], icon: 'market'}),
      new MenuItem({label: 'Manufacture', route: ['/main/manufacture'], icon: 'puzzle'}),
      new MenuItem({label: 'Budget', route: ['/main/budget'], icon: 'money'}),
      new MenuItem({label: 'Budget Requests', route: ['/main/budget-request'], icon: 'cash'}),
      new MenuItem({label: 'Production', route: ['/main/production'], icon: 'conveyor'}),
      new MenuItem({label: 'Report', route: ['/main/report'], icon: 'report'}),
      new MenuItem({label: 'Analytics', route: ['/main/analytics'], icon: 'analyze'}),
    ];
  }

  private menuItemsForSystemAdmin(): MenuItem[] {
    return [
      new MenuItem({label: 'Market', route: ['/main/crud-market'], icon: 'market'}),
      new MenuItem({label: 'Person', route: ['/main/crud-user'], icon: 'team'}),
    ];
  }

  private async defaultPage(): Promise<string> {
    const user = await this.authService.userInfo();

    let path: string;

    switch (user.specialization) {
      case Specialization.COMPANY_DIRECTOR:
        path = '/main/company';
        break;

      case Specialization.FACTORY_DIRECTOR:
        path = '/main/factory';
        break;

      case Specialization.DEPARTMENT_DIRECTOR:
        path = '/main/user';
        break;

      case Specialization.SYSTEM_ADMIN:
        path = '/main/crud-market';
        break;

      default:
        throw new Error('8m2393CE94 :: You have no right access to view menu items');
    }

    return of(path).toPromise();
  }

}
