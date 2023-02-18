import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MarketMaterial} from "@model/material/MarketMaterial";
import {BottomNotificationService} from "@service/bottom-notification/bottom-notification.service";
import {MarketController} from "@controller/MarketController";
import {Unsub} from "@util/Unsub";
import {BudgetController} from "@controller/BudgetController";

@Component({
  selector: 'app-market-dialog',
  templateUrl: './market-dialog.component.html',
  styleUrls: ['./market-dialog.component.scss'],
})
export class MarketDialogComponent implements OnInit, OnDestroy {

  readonly material: MarketMaterial;

  kgToBuy = 1;
  price = 0;
  availableBudget = 0;

  private unsub = new Unsub();

  constructor(
    private dialogRef: MatDialogRef<MarketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { material: MarketMaterial },
    private readonly marketController: MarketController,
    private readonly budgetController: BudgetController,
    private readonly notificationService: BottomNotificationService,
  ) {
    this.material = data.material;

    this.calculatePrice();
  }

  ngOnInit() {
    this.unsub.sub = this.budgetController.loadAvailableBudget().subscribe(budget => this.availableBudget = budget);
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  calculatePrice(): void {
    if (this.kgToBuy <= 0) {
      this.price = 0;
    } else {
      this.price = this.kgToBuy * this.material.price;
    }
  }

  buyMaterial(): void {
    this.unsub.sub = this.marketController.buyMaterial(this.material.id, this.kgToBuy).subscribe(() => {
      this.notificationService.showInfo('You successfully bought an material!');
      this.dialogRef.close();
    });
  }

}
