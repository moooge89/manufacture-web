import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarketMaterialDialogComponent} from "@shared/market-material-dialog/market-material-dialog.component";
import {ButtonModule} from "@shared/button/button.module";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [MarketMaterialDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [
    MarketMaterialDialogComponent,
  ]
})
export class MarketMaterialDialogModule {
}
