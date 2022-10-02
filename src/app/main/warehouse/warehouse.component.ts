import {Component} from '@angular/core';
import {Material} from "@model/api/Material";
import {MatDialog} from "@angular/material/dialog";
import {MaterialDialogComponent} from "@shared/material-dialog/material-dialog.component";
import {DEFAULT_CONFIG} from "@const/DialogConst";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent {

  constructor(private readonly dialog: MatDialog,) {
  }

  materials: Material[] = [
    {
      icon: 'sand',
      name: 'Sand',
      available: 1000.2,
      usedIn: 'window, and in other staffs'
    },
  ];

  onRowClick(material: Material): void {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      ...DEFAULT_CONFIG,
      data: {material: material},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
