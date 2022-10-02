import {Component} from '@angular/core';
import {Material} from "../../../model/api/Material";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent {

  materials: Material[] = [
    {
      icon: 'sand',
      name: 'Sand',
      available: 1000.2,
      usedIn: 'window, and in other staffs'
    },
  ];

}
