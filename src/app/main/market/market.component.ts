import {Component, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/api/material/MarketMaterial";
import {MarketMarketDialogComponent} from "@shared/market-material-dialog/market-material-dialog.component";
import {MarketController} from "@controller/MarketController";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnDestroy {

  materials$ = this.marketController.loadMarketMaterials();

  private dialogRef: MatDialogRef<MarketMarketDialogComponent> | undefined;

  constructor(private readonly dialog: MatDialog,
              private readonly marketController: MarketController,) {
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  isMatIcon = (index: number) => {
    return index === 0;
  }

  isMoney = (index: number) => {
    return index === 3;
  }

  onRowClick(material: MarketMaterial): void {
    this.dialogRef?.close();

    this.dialogRef = this.dialog.open(MarketMarketDialogComponent, {
      width: '720px',
      height: '320px',
      data: {material: material},
    });
  }

}
