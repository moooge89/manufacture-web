import {Injectable} from '@angular/core';
import {AuthService} from "@service/auth/auth.service";
import {MenuItem} from "@model/web/MenuItem";
import {UserRole} from "@model/auth/UserRole";
import {of} from "rxjs";

@Injectable({providedIn: 'root'})
export class MenuService {

  constructor(
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

      default:
        throw new Error('18xn6L9PE1 :: YOu have no right access to view menu items');
    }

    return of(menuItems).toPromise();
  }

  private menuItemsForCompanyDirector(): MenuItem[] {
    return [
      {label: 'Company', route: ['/main/company'], icon: 'company'},
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
      {label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'},
      {label: 'Market', route: ['/main/market'], icon: 'market'},
      {label: 'Budget', route: ['/main/budget'], icon: 'money'},
      {label: 'Production', route: ['/main/production'], icon: 'conveyor'},
      {label: 'Report', route: ['/main/report'], icon: 'report'},
    ];
  }

  private menuItemsForDepartmentDirector(): MenuItem[] {
    return [
      {label: 'Departments', route: ['/main/departments'], icon: 'team'},
      {label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'},
      {label: 'Market', route: ['/main/market'], icon: 'market'},
      {label: 'Budget', route: ['/main/budget'], icon: 'money'},
      {label: 'Production', route: ['/main/production'], icon: 'conveyor'},
      {label: 'Report', route: ['/main/report'], icon: 'report'},
    ];
  }

}
