import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  CrudMarketMaterialDialogComponent
} from "../../app/dialogue/crud-market-material/crud-market-material-dialog.component";
import {MarketMaterial} from "@model/api/material/MarketMaterial";
import {MarketMaterialResp} from "@model/dialog/MarketMaterialResp";

@Injectable({providedIn: 'root'})
export class CrudMarketService {

  constructor(
    private readonly dialog: MatDialog,
  ) {
  }

  openDialogForCreate(): Promise<MarketMaterialResp> {

    const materialToCreate: MarketMaterial = {
      name: '',
      price: 0,
      id: '',
      country: '',
      countryId: '',
      icon: '',
      iconId: '',
    };

    const dialogRef = this.dialog.open(CrudMarketMaterialDialogComponent, {
      width: '800px',
      height: '400px',
      data: {
        material: materialToCreate,
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
