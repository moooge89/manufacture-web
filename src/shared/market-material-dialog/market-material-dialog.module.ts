import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarketMarketDialogComponent} from "@shared/market-material-dialog/market-material-dialog.component";
import {ButtonModule} from "@shared/button/button.module";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  declarations: [MarketMarketDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MatSliderModule,
  ],
  exports: [
    MarketMarketDialogComponent,
  ]
})
export class MarketMaterialDialogModule {
}
