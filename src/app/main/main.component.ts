import {Component, OnInit} from '@angular/core';
import {MenuItem} from "@model/web/MenuItem";
import {Router} from "@angular/router";

const finalItems: MenuItem[] = [
  {label: 'Factory', route: ['/main/factory'], icon: 'factory'},
  {label: 'Departments', route: ['/main/departments'], icon: 'team'},
  {label: 'Warehouse', route: ['/main/warehouse'], icon: 'box'},
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  readonly items = finalItems;

  constructor(private readonly router: Router) {
  }

  ngOnInit() {
    // todo era remove
    // this.router.navigate(['/main/factory']);
  }

}
