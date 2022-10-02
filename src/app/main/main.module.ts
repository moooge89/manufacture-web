import {NgModule} from '@angular/core';
import {MainComponent} from "./main.component";
import {MainRoutingModule} from "./main-routing.module";
import {CommonModule} from "@angular/common";
import {MenuModule} from "@shared/menu/menu.module";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenuModule,
    MatDialogModule,
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
