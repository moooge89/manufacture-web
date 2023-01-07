import {Component, OnInit} from '@angular/core';
import {MenuItem} from "@model/web/MenuItem";
import {AuthService} from "@service/auth/auth.service";
import {MenuService} from "@service/menu/menu.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor(private readonly authService: AuthService,
              private readonly menuService: MenuService,) {
  }

  async ngOnInit() {
    await this.authService.init();

    this.menuItems = await this.menuService.menuItems();

    await this.menuService.redirectToDefaultPageIfNeeded();
  }

}
