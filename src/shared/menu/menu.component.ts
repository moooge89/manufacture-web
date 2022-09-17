import {Component, Input} from '@angular/core';
import {MenuItem} from "../../model/web/MenuItem";
import {Router} from "@angular/router";
import {TOKEN} from "../../consts/LocalStorageConst";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  @Input() menuItems: MenuItem[] = [];

  constructor(private readonly router: Router) {
  }

  async logout() {
    // todo era use authService.logout()
    localStorage.setItem(TOKEN, '');
    await this.router.navigate(['/auth']);
  }

}
