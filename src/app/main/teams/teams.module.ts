import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {TeamsComponent} from "./teams.component";
import {TeamsRoutingModule} from "./teams-routing.module";

@NgModule({
  declarations: [TeamsComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatIconModule,
  ],
  bootstrap: [TeamsComponent]
})
export class TeamsModule {
}
