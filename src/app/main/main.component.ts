import {Component, OnInit} from '@angular/core';
import {MenuItem} from "../../model/web/MenuItem";
import {Router} from "@angular/router";

const finalItems: MenuItem[] = [
  {label: 'Factory', route: ['/factory']},
  {label: 'Teams', route: ['/factory/team']},
  {label: 'Warehouse', route: ['/factory/warehouse']},
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
    this.router.navigate(['/main/factory']);
  }

}
