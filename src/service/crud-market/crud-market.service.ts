import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  CrudMarketMaterialDialogComponent
} from "../../app/dialogue/crud-market-material/crud-market-material-dialog.component";
import {MarketMaterial} from "@model/material/MarketMaterial";
import {MarketMaterialResp} from "@model/dialog/MarketMaterialResp";

@Injectable({providedIn: 'root'})
export class CrudMarketService {

  constructor(
    private readonly dialog: MatDialog,
  ) {
  }

  openDialogForCreate(): Promise<MarketMaterialResp> {

    const marketMaterial: MarketMaterial = {
      id: NaN,
      available: 0,
      country: '',
      icon: '',
      countryId: NaN,
      iconId: NaN,
      name: '',
      price: 0,
    };

    const dialogRef = this.dialog.open(CrudMarketMaterialDialogComponent, {
      width: '800px',
      height: '400px',
      data: {
        material: marketMaterial,
        noNeedToConfirm: true,
        isSave: true,
      },
      disableClose: true,
    });

    return dialogRef.afterClosed().toPromise();
  }

  openDialogForEdit(material: MarketMaterial): Promise<MarketMaterialResp> {

    const dialogRef = this.dialog.open(CrudMarketMaterialDialogComponent, {
      width: '800px',
      height: '400px',
      data: {
        material: material,
        noNeedToConfirm: false,
        isSave: false,
      },
      disableClose: true,
    });

    return dialogRef.afterClosed().toPromise();
  }

}
