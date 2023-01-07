import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from "@service/auth/auth.service";
import {from} from "rxjs";
import {map, tap} from "rxjs/operators";
import {MenuService} from "@service/menu/menu.service";
import {UserRole} from "@model/auth/UserRole";

@Injectable()
export class DepartmentGuard implements CanLoad {

  constructor(
    private readonly authService: AuthService,
    private readonly menuService: MenuService,
  ) {
  }

  canLoad(): Observable<boolean> {

    return from(this.authService.userInfo()).pipe(
      map(userInfo => userInfo.role),
      map(role => role === UserRole.DEPARTMENT_DIRECTOR),
      tap(async canLoad => {
        if (!canLoad) {
          await this.menuService.redirectToDefaultPage();
        }
      }),
    );

  }

}
