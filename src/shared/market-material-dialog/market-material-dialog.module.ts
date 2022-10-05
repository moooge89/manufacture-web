import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarketMarketDialogComponent} from "@shared/market-material-dialog/market-material-dialog.component";
import {ButtonModule} from "@shared/button/button.module";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [MarketMarketDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [
    MarketMarketDialogComponent,
  ]
})
export class MarketMaterialDialogModule {
}
