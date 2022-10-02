import {Injectable} from "@angular/core";
import {TOKEN} from "@const/LocalStorageConst";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private readonly router: Router
  ) {
  }

  async logout() {
    localStorage.setItem(TOKEN, '');
    // todo era make request to remove token
    await this.router.navigate(['/auth']);
  }

}
