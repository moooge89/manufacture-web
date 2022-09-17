import {NgModule} from '@angular/core';
import {MainComponent} from "./main.component";
import {MainRoutingModule} from "./main-routing.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
