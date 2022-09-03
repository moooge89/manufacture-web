import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';
import {of} from "rxjs";

@Injectable()
export class IsLoggedInGuard implements CanLoad {

  constructor(
    private readonly router: Router,
  ) {
  }

  canLoad(): Observable<boolean> {

    // 1. init auth service
    // 2. check, if logged in

    return of(true).pipe(
      tap(() => {
        this.router.navigateByUrl('/auth').then();
      }),
    );
  }


}
