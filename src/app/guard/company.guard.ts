import {Injectable} from '@angular/core';
import {CanLoad} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from "@service/auth/auth.service";
import {from} from "rxjs";
import {map, tap} from "rxjs/operators";
import {MenuService} from "@service/menu/menu.service";
import {Specialization} from "@model/user/Specialization";

@Injectable()
export class CompanyGuard implements CanLoad {

  constructor(
    private readonly authService: AuthService,
    private readonly menuService: MenuService,
  ) {
  }

  canLoad(): Observable<boolean> {

    return from(this.authService.userInfo()).pipe(
      map(userInfo => userInfo.specialization),
      map(spec => spec === Specialization.COMPANY_DIRECTOR),
      tap(async canLoad => {
        if (!canLoad) {
          await this.menuService.redirectToDefaultPage();
        }
      }),
    );

  }

}
