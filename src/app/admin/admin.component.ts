import {Component} from '@angular/core';
import {MenuItem} from "@model/web/MenuItem";

const finalItems: MenuItem[] = [
  {label: 'Market', route: ['/main/market'], icon: 'market'},
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  readonly items = finalItems;

}
