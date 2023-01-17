import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/api/material/MarketMaterial";
import {BottomNotificationService} from "@service/bottom-notification/bottom-notification.service";

@Component({
  selector: 'app-market-dialog',
  templateUrl: './market-dialog.component.html',
  styleUrls: ['./market-dialog.component.scss'],
})
export class MarketDialogComponent {

  material: MarketMaterial;

  kgToBuy = 1;
  price = 0

  constructor(
    private dialogRef: MatDialogRef<MarketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { material: MarketMaterial },
    private readonly notificationService: BottomNotificationService,
  ) {
    this.material = data.material;

    this.calculatePrice();
  }

  calculatePrice(): void {
    if (this.kgToBuy <= 0) {
      this.price = 0;
    } else {
      this.price = this.kgToBuy * 16;
    }
  }

  buyMaterial(): void {
    this.notificationService.showInfo('You successfully bought an material!');
    this.dialogRef.close();
  }

}
