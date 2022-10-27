import {Component} from '@angular/core';
import {MenuItem} from "@model/web/MenuItem";

const finalItems: MenuItem[] = [
  {label: 'Factory', route: ['/main/factory'], icon: 'factory'},
  {label: 'Departments', route: ['/main/departments'], icon: 'team'},
  {label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'},
  {label: 'Market', route: ['/main/market'], icon: 'market'},
  {label: 'Budget', route: ['/main/budget'], icon: 'money'},
  {label: 'Production', route: ['/main/production'], icon: 'conveyor'},
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  readonly items = finalItems;

}
