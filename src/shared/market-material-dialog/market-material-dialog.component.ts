import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/api/material/MarketMaterial";

@Component({
  selector: 'app-market-material-dialog',
  templateUrl: './market-material-dialog.component.html',
  styleUrls: ['./market-material-dialog.component.scss'],
})
export class MarketMarketDialogComponent {

  material: MarketMaterial;

  constructor(
    private dialogRef: MatDialogRef<MarketMarketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { material: MarketMaterial },
  ) {
    this.material = data.material;
  }

  buyMaterial(): void {

  }

}
