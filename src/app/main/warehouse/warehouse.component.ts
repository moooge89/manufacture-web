import {Component, OnDestroy} from '@angular/core';
import {WarehouseMaterial} from "@model/api/material/WarehouseMaterial";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MaterialDialogComponent} from "@shared/material-dialog/material-dialog.component";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnDestroy {

  materials: WarehouseMaterial[] = [
    {
      icon: 'sand',
      name: 'Sand',
      available: 1000.2,
      usedIn: 'window, and in other staffs'
    },
  ];

  private dialogRef: MatDialogRef<MaterialDialogComponent> | undefined;

  constructor(private readonly dialog: MatDialog,) {
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  isMatIcon = (index: number) => {
    return index === 0;
  }

  onRowClick(material: WarehouseMaterial): void {
    this.dialogRef?.close();
    this.dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '720px',
      height: '320px',
      data: {material: material},
    });
  }

}
