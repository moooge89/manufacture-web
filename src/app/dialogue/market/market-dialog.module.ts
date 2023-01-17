import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarketDialogComponent} from "./market-dialog.component";
import {ButtonModule} from "@shared/button/button.module";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [MarketDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [
    MarketDialogComponent,
  ]
})
export class MarketDialogModule {
}
