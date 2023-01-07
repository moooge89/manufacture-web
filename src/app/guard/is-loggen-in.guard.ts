import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {AuthService} from "@service/auth/auth.service";
import {of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class IsLoggedInGuard implements CanLoad {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  canLoad(): Observable<boolean> {
    const isTokenProvided = this.authService.isTokenProvided();

    return of(isTokenProvided).pipe(
      tap(async () => {
        if (!isTokenProvided) {
          await this.router.navigateByUrl('/auth');
        }
      })
    );

  }

}
