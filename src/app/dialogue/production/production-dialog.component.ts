import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductionInfo} from "@model/production/ProductionInfo";

@Component({
  selector: 'app-production-dialog',
  templateUrl: './production-dialog.component.html',
  styleUrls: ['./production-dialog.component.scss'],
})
export class ProductionDialogComponent {

  productionInfo: ProductionInfo;

  constructor(
    private dialogRef: MatDialogRef<ProductionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: {productionInfo: ProductionInfo},
  ) {
    this.productionInfo = data.productionInfo;
  }

}
