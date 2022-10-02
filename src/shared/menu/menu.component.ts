import {Component, Input} from '@angular/core';
import {MenuItem} from "@model/web/MenuItem";
import {AuthService} from "@service/auth/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  @Input() menuItems: MenuItem[] = [];

  constructor(private readonly authService: AuthService) {
  }

  async logout() {
    await this.authService.logout();
  }

}
