import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';
import {of} from "rxjs";
import {TOKEN} from "@const/LocalStorageConst";

@Injectable()
export class IsLoggedInGuard implements CanLoad {

  constructor(
    private readonly router: Router,
  ) {
  }

  canLoad(): Observable<boolean> {

    // 1. init auth service
    // 2. check, if logged in

    const token = localStorage.getItem(TOKEN);

    return of(!!token).pipe(
      tap(isValid => {
        if (!isValid) {
          this.router.navigateByUrl('/auth').then();
        }
      }),
    );
  }


}
