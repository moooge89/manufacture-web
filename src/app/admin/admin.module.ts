import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MenuModule} from "@shared/menu/menu.module";
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenuModule,
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule {
}
